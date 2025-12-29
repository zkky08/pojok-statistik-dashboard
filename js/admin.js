// Simple admin JS for login, dashboard, history, insert, and profile
const API_BASE = '';

function getToken() { return localStorage.getItem('admin_token'); }
function saveToken(t) { localStorage.setItem('admin_token', t); }
function clearToken() { localStorage.removeItem('admin_token'); }

// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errEl = document.getElementById('loginError');
    errEl.textContent = '';
    try {
      const res = await fetch(API_BASE + '/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) return errEl.textContent = data.error || 'Login gagal';
      saveToken(data.token);
      window.location.href = '/pages/admin-dashboard.html';
    } catch (err) {
      errEl.textContent = 'Gagal terhubung ke server';
    }
  });
}

// Dashboard actions
async function fetchStats() {
  const token = getToken();
  if (!token) return window.location.href = '/pages/admin-login.html';
  const res = await fetch(API_BASE + '/admin/stats', { headers: { Authorization: 'Bearer ' + token } });
  if (!res.ok) { clearToken(); return window.location.href = '/pages/admin-login.html'; }
  const data = await res.json();
  document.getElementById('statDokumentasi').textContent = data.dokumentasi;
  document.getElementById('statInfografis').textContent = data.infografis;
  document.getElementById('statInfo').textContent = data.info;
}

async function fetchHistory() {
  const token = getToken();
  if (!token) return;
  const res = await fetch(API_BASE + '/admin/history?limit=100', { headers: { Authorization: 'Bearer ' + token } });
  if (!res.ok) return;
  const data = await res.json();
  const box = document.getElementById('historyList');
  box.innerHTML = data.map(h => `<div class="p-2 border-b">[${h.created_at}] <strong>${h.admin_username || h.admin_id}</strong> ${h.action} <em>${h.item_type}#${h.item_id}</em></div>`).join('');
}

// Insert form
const insertForm = document.getElementById('insertForm');
if (insertForm) {
  insertForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return window.location.href = '/pages/admin-login.html';
    const type = document.getElementById('insertType').value;
    const title = document.getElementById('insertTitle').value;
    const content = document.getElementById('insertContent').value;
    const extra = document.getElementById('insertExtra').value;
    const payload = {};
    if (type === 'infografis') { payload.title = title; payload.description = content; payload.image = extra; }
    if (type === 'dokumentasi') { payload.title = title; payload.description = content; payload.file = extra; }
    if (type === 'info') { payload.title = title; payload.content = content; }
    const res = await fetch(API_BASE + '/admin/insert', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ type, payload })
    });
    const data = await res.json();
    const msg = document.getElementById('insertMsg');
    if (!res.ok) { msg.textContent = data.error || 'Gagal insert'; msg.classList.add('text-red-600'); return; }
    msg.textContent = 'Berhasil. ID: ' + data.itemId; msg.classList.remove('text-red-600');
    fetchStats(); fetchHistory();
  });
}

// Profile & logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) btnLogout.addEventListener('click', () => { clearToken(); window.location.href = '/pages/admin-login.html'; });

async function loadProfile() {
  const token = getToken();
  if (!token) return window.location.href = '/pages/admin-login.html';
  const res = await fetch(API_BASE + '/admin/profile', { headers: { Authorization: 'Bearer ' + token } });
  if (!res.ok) { clearToken(); return window.location.href = '/pages/admin-login.html'; }
  const data = await res.json();
  const box = document.getElementById('profileBox');
  if (box) box.innerHTML = `<div><strong>${data.name}</strong> (${data.username})</div><div>${data.email || ''}</div>`;
}

// Auto-run on dashboard
if (window.location.pathname.endsWith('/pages/admin-dashboard.html')) {
  fetchStats(); fetchHistory(); loadProfile();
}

// If on admin-profile.html (not yet created) we could add handlers here later
// Profile page handlers
if (window.location.pathname.endsWith('/pages/admin-profile.html')) {
  (async () => {
    const token = getToken();
    if (!token) return window.location.href = '/pages/admin-login.html';
    const res = await fetch(API_BASE + '/admin/profile', { headers: { Authorization: 'Bearer ' + token } });
    if (!res.ok) { clearToken(); return window.location.href = '/pages/admin-login.html'; }
    const data = await res.json();
    document.getElementById('profileName').value = data.name || '';
    document.getElementById('profileEmail').value = data.email || '';

    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('profileName').value;
      const email = document.getElementById('profileEmail').value;
      const password = document.getElementById('profilePassword').value;
      const body = { name, email };
      if (password) body.password = password;
      const upd = await fetch(API_BASE + '/admin/profile', {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify(body)
      });
      const msg = document.getElementById('profileMsg');
      if (!upd.ok) { const d = await upd.json(); msg.textContent = d.error || 'Gagal update'; msg.classList.add('text-red-600'); return; }
      msg.textContent = 'Profile diperbarui'; msg.classList.remove('text-red-600');
    });
  })();
}
