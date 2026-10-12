// main.js — Lógica do frontend (usada por index.html e dashboard.html)
// Cada página só ativa os blocos cujos elementos existem.

const POLL_MS = 1500;
const polling = new Map(); // jobId -> timer

// ---------- Cartão de vídeo (galeria) ----------
function videoCard(v) {
  const active = v.status === 'queued' || v.status === 'processing';
  const thumb = v.status === 'completed'
    ? `<video src="${esc(v.streamUrl)}" controls preload="metadata" playsinline></video>`
    : active ? `<div>${esc(STATUS_LABEL[v.status])}…<br>${v.progress ?? 0}%</div>`
    : `<div class="err">${esc(v.error || 'Erro ao gerar')}</div>`;
  return `
    <article class="vcard" data-id="${esc(v.id)}">
      <div class="vthumb">${thumb}</div>
      <div class="vbody">
        <div class="vtitle" title="${esc(v.title)}">${esc(v.title)}</div>
        <div><span class="badge ${esc(v.status)}">${esc(STATUS_LABEL[v.status])}</span></div>
        <div class="vmeta">${esc(v.template)} · ${esc(v.quality)} · ${esc(v.aspect)}${v.durationSec ? ' · ' + formatDuration(v.durationSec) : ''}</div>
        <div class="vactions">
          ${v.downloadUrl ? `<a class="btn sm" href="${esc(v.downloadUrl)}">Baixar</a>` : ''}
          <button class="ghost danger sm" data-delete="${esc(v.id)}" ${v.status === 'processing' ? 'disabled' : ''}>Excluir</button>
        </div>
      </div>
    </article>`;
}

// ---------- Progresso em tempo real ----------
function renderActiveJob(job, title) {
  const box = $('#activeJobs');
  if (!box) return;
  let el = box.querySelector(`[data-job="${job.jobId}"]`);
  if (!el) {
    el = document.createElement('div');
    el.className = 'active-job';
    el.dataset.job = job.jobId;
    box.prepend(el);
  }
  el.innerHTML = `
    <div class="top"><strong>${esc(title)}</strong><span>${esc(job.stage)} · ${job.progress}%</span></div>
    <div class="bar"><i style="width:${job.progress}%"></i></div>
    ${job.error ? `<div class="err">${esc(job.error)}</div>` : ''}`;
  return el;
}

function trackJob(jobId, title, onDone) {
  if (polling.has(jobId)) return;
  const tick = async () => {
    try {
      const job = await api.jobStatus(jobId);
      const el = renderActiveJob(job, title);
      if (job.status === 'completed' || job.status === 'failed') {
        polling.delete(jobId);
        toast(job.status === 'completed' ? `“${title}” está pronto!` : `Falha em “${title}”`, job.status === 'failed');
        setTimeout(() => el && el.remove(), 2500);
        onDone && onDone();
        return;
      }
    } catch (err) {
      polling.delete(jobId);
      return;
    }
    polling.set(jobId, setTimeout(tick, POLL_MS));
  };
  polling.set(jobId, setTimeout(tick, 200));
}

// ---------- Galeria (index.html) ----------
async function refreshGallery() {
  const gallery = $('#gallery');
  if (!gallery) return;
  try {
    const { videos } = await api.listVideos({ limit: 24 });
    gallery.innerHTML = videos.length ? videos.map(videoCard).join('') : '<div class="empty">Nenhum vídeo ainda. Crie o primeiro ao lado!</div>';
    // Retoma o acompanhamento de jobs ativos (ex.: após recarregar a página)
    videos.filter((v) => v.jobId && (v.status === 'queued' || v.status === 'processing'))
      .forEach((v) => trackJob(v.jobId, v.title, refreshGallery));
  } catch (err) { toast(err.message, true); }
}

async function initCreateForm() {
  const form = $('#createForm');
  if (!form) return;

  const { templates, options } = await api.templates();
  $('#template').innerHTML = templates.map((t) => `<option value="${esc(t.id)}">${esc(t.name)} — ${esc(t.description)}</option>`).join('');
  $('#quality').innerHTML = options.qualities.map((q) => `<option ${q === '1080p' ? 'selected' : ''}>${esc(q)}</option>`).join('');
  $('#aspect').innerHTML = options.aspects.map((a) => `<option>${esc(a)}</option>`).join('');
  $('#aiHint').textContent = options.ai.claude || options.ai.openai
    ? `IA ativa: ${[options.ai.claude && 'Claude', options.ai.openai && 'OpenAI'].filter(Boolean).join(' + ')}`
    : 'Sem chaves de IA no .env — o roteiro será dividido localmente.';
  $('#voiceHint').textContent = options.ai.openai ? 'Usa OpenAI TTS.' : 'Requer OPENAI_API_KEY no .env.';

  const script = $('#script');
  const counter = $('#counter');
  script.maxLength = options.maxScriptChars;
  script.addEventListener('input', () => { counter.textContent = `${script.value.length}/${options.maxScriptChars}`; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('#submitBtn');
    btn.disabled = true;
    try {
      const { video, job } = await api.createVideo({
        title: $('#title').value, script: script.value,
        template: $('#template').value, quality: $('#quality').value, aspect: $('#aspect').value,
        useAI: $('#useAI').checked, useVoice: $('#useVoice').checked,
      });
      toast('Vídeo na fila!');
      renderActiveJob(job, video.title);
      trackJob(job.jobId, video.title, refreshGallery);
      refreshGallery();
    } catch (err) { toast(err.message, true); }
    finally { btn.disabled = false; }
  });
}

// ---------- Dashboard (dashboard.html) ----------
async function refreshDashboard() {
  const table = $('#historyBody');
  if (!table) return;
  try {
    const { videos, stats } = await api.listVideos({ limit: 100 });
    $('#sTotal').textContent = stats.total;
    $('#sDone').textContent = stats.completed;
    $('#sActive').textContent = stats.active;
    $('#sFailed').textContent = stats.failed;
    $('#sDuration').textContent = formatDuration(stats.seconds);
    $('#sSize').textContent = formatBytes(stats.bytes);
    table.innerHTML = videos.length ? videos.map((v) => `
      <tr>
        <td>${esc(v.title)}</td>
        <td>${esc(v.template)}</td>
        <td>${esc(v.quality)} · ${esc(v.aspect)}</td>
        <td><span class="badge ${esc(v.status)}">${esc(STATUS_LABEL[v.status])}</span>${v.status === 'processing' ? ` ${v.progress}%` : ''}${v.status === 'failed' ? `<div class="err">${esc(v.error)}</div>` : ''}</td>
        <td>${formatDuration(v.durationSec)}</td>
        <td>${formatBytes(v.fileSize)}</td>
        <td>${formatDate(v.createdAt)}</td>
        <td>${v.downloadUrl ? `<a class="btn sm" href="${esc(v.downloadUrl)}">Baixar</a> ` : ''}<button class="ghost danger sm" data-delete="${esc(v.id)}" ${v.status === 'processing' ? 'disabled' : ''}>Excluir</button></td>
      </tr>`).join('') : '<tr><td colspan="8" class="empty">Nenhum vídeo gerado ainda.</td></tr>';
    if (stats.active) setTimeout(refreshDashboard, 3000); // atualiza enquanto houver jobs ativos
  } catch (err) { toast(err.message, true); }
}

// ---------- Excluir (delegação de eventos) ----------
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-delete]');
  if (!btn) return;
  if (!confirm('Excluir este vídeo definitivamente?')) return;
  try {
    await api.deleteVideo(btn.dataset.delete);
    toast('Vídeo excluído.');
    refreshGallery();
    refreshDashboard();
  } catch (err) { toast(err.message, true); }
});

document.addEventListener('DOMContentLoaded', () => {
  initCreateForm().catch((err) => toast(err.message, true));
  refreshGallery();
  refreshDashboard();
});
