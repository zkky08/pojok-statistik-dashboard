/* =====================================================
   KONFIGURASI GLOBAL
===================================================== */
const API_BASE = "http://localhost:4000";

/* =====================================================
   LOGOUT
===================================================== */
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  if (!confirm("Yakin ingin logout?")) return;
  localStorage.clear();
  window.location.href = "../publik/index.html";
});

/* =====================================================
   ELEMENT UMUM
===================================================== */
const cards = document.querySelector(".cards");
const welcome = document.querySelector(".welcome");

/* =====================================================
   MENU DASHBOARD / HOME
===================================================== */
const menuDashboard = document.getElementById("menuDashboard");
const logoHome = document.getElementById("logoHome");

function showHome() {
  hideAllSections();
  cards.style.display = "grid";
  welcome.style.display = "block";
  setActiveMenu(menuDashboard);
  loadDashboardCounts();
}

menuDashboard?.addEventListener("click", showHome);
logoHome?.addEventListener("click", showHome);

/* =====================================================
   ADMIN
===================================================== */
const menuAdmin = document.getElementById("menuAdmin");
const adminSection = document.getElementById("adminSection");
const adminTableBody = document.querySelector("#adminTable tbody");

menuAdmin?.addEventListener("click", () => {
  hideAllSections();
  adminSection.style.display = "block";
  setActiveMenu(menuAdmin);
  loadAdmins();
});

function loadAdmins() {
  adminTableBody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";
  fetch(`${API_BASE}/api/admin`)
    .then(res => res.json())
    .then(data => {
      adminTableBody.innerHTML = "";
      data.forEach(a => {
        adminTableBody.innerHTML += `
          <tr>
            <td>${a.username}</td>
            <td>${a.role}</td>
            <td>
              ${
                a.role !== "super"
                  ? `<button onclick="deleteAdmin(${a.id})">Hapus</button>`
                  : `<em>Super Admin</em>`
              }
            </td>
          </tr>`;
      });
    });
}

window.deleteAdmin = id => {
  if (!confirm("Hapus admin ini?")) return;
  fetch(`${API_BASE}/api/admin/${id}`, { method: "DELETE" })
    .then(() => loadAdmins());
};

/* ======================
   FORM TAMBAH ADMIN
====================== */
const adminForm = document.getElementById("adminForm");
const adminMsg = document.getElementById("adminMsg");
const btnCancelAdmin = document.getElementById("btnCancelAdmin");

adminForm?.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🔥 KUNCI UTAMA (ANTI REDIRECT)

  const username = adminUsername.value.trim();
  const password = adminPassword.value;
  const role = adminRole.value;

  if (!username || !password) {
    adminMsg.textContent = "Username dan password wajib diisi";
    adminMsg.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });

    const data = await res.json();

    if (!res.ok) {
      adminMsg.textContent = data.message || "Gagal menambah admin";
      adminMsg.style.color = "red";
      return;
    }

    adminMsg.textContent = "Admin berhasil ditambahkan";
    adminMsg.style.color = "green";

    adminForm.reset();
    loadAdmins();

  } catch (err) {
    adminMsg.textContent = "Server error";
    adminMsg.style.color = "red";
  }
});

btnCancelAdmin?.addEventListener("click", () => {
  adminForm.reset();
  adminMsg.textContent = "";
});

/* =====================================================
   INFOGRAFIS
===================================================== */
const menuInfografis = document.getElementById("menuInfografis");
const infografisSection = document.getElementById("infografisSection");
const infografisForm = document.getElementById("infografisForm");
const infografisGrid = document.getElementById("infografisGrid");
const INFOGRAFIS_API = `${API_BASE}/api/infografis`;

menuInfografis?.addEventListener("click", () => {
  hideAllSections();
  infografisSection.style.display = "block";
  setActiveMenu(menuInfografis);
  loadInfografis();
});

function renderCard({ img, title, date, desk, onDelete }) {
  return `
    <div class="infografis-card">
      <img src="${img}">
      <div class="content">
        <h4>${title}</h4>
        <small>${date}</small>
        <p>${desk || ""}</p>
        <button onclick="${onDelete}">Hapus</button>
      </div>
    </div>`;
}

function loadInfografis() {
  infografisGrid.innerHTML = "Loading...";
  fetch(INFOGRAFIS_API)
    .then(res => res.json())
    .then(data => {
      infografisGrid.innerHTML = "";
      if (!data.length) {
        infografisGrid.innerHTML = "<p>Belum ada infografis</p>";
        return;
      }
      data.forEach(i => {
        infografisGrid.innerHTML += renderCard({
          img: i.img,
          title: i.title,
          date: i.date,
          desk: i.desk,
          onDelete: `deleteInfografis(${i.id})`
        });
      });
    });
}

infografisForm?.addEventListener("submit", e => {
  e.preventDefault();
  fetch(INFOGRAFIS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: infografisJudul.value,
      desk: infografisDesk.value,
      img: infografisGambar.value,
      date: infografisDate.value
    })
  }).then(() => {
    infografisForm.reset();
    loadInfografis();
    loadDashboardCounts();
  });
});

window.deleteInfografis = id => {
  if (!confirm("Hapus infografis?")) return;
  fetch(`${INFOGRAFIS_API}/${id}`, { method: "DELETE" })
    .then(() => {
      loadInfografis();
      loadDashboardCounts();
    });
};

/* =====================================================
   BERITA
===================================================== */
const menuBerita = document.getElementById("menuBerita");
const beritaSection = document.getElementById("beritaSection");
const beritaForm = document.getElementById("beritaForm");
const beritaGrid = document.getElementById("beritaGrid");
const BERITA_API = `${API_BASE}/api/berita`;

menuBerita?.addEventListener("click", () => {
  hideAllSections();
  beritaSection.style.display = "block";
  setActiveMenu(menuBerita);
  loadBerita();
});

function loadBerita() {
  beritaGrid.innerHTML = "Loading...";
  fetch(BERITA_API)
    .then(res => res.json())
    .then(data => {
      beritaGrid.innerHTML = "";
      if (!data.length) {
        beritaGrid.innerHTML = "<p>Belum ada berita</p>";
        return;
      }
      data.forEach(b => {
        beritaGrid.innerHTML += renderCard({
          img: b.img,
          title: b.title,
          date: b.date,
          desk: b.desk,
          onDelete: `deleteBerita(${b.id})`
        });
      });
    });
}

beritaForm?.addEventListener("submit", e => {
  e.preventDefault();
  fetch(BERITA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      judul: beritaJudul.value,
      desk: beritaDesk.value,
      img: beritaGambar.value,
      date: beritaDate.value
    })
  }).then(() => {
    beritaForm.reset();
    loadBerita();
    loadDashboardCounts();
  });
});

window.deleteBerita = id => {
  if (!confirm("Hapus berita?")) return;
  fetch(`${BERITA_API}/${id}`, { method: "DELETE" })
    .then(() => {
      loadBerita();
      loadDashboardCounts();
    });
};

/* =====================================================
   DOKUMENTASI
===================================================== */
const menuDokumentasi = document.getElementById("menuDokumentasi");
const dokumentasiSection = document.getElementById("dokumentasiSection");
const dokumentasiForm = document.getElementById("dokumentasiForm");
const dokumentasiGrid = document.getElementById("dokumentasiGrid");
const DOKUMENTASI_API = `${API_BASE}/api/dokumentasi`;

menuDokumentasi?.addEventListener("click", () => {
  hideAllSections();
  dokumentasiSection.style.display = "block";
  setActiveMenu(menuDokumentasi);
  loadDokumentasi();
});

function loadDokumentasi() {
  dokumentasiGrid.innerHTML = "Loading...";
  fetch(DOKUMENTASI_API)
    .then(res => res.json())
    .then(data => {
      dokumentasiGrid.innerHTML = "";
      if (!data.length) {
        dokumentasiGrid.innerHTML = "<p>Belum ada dokumentasi</p>";
        return;
      }
      data.forEach(d => {
        dokumentasiGrid.innerHTML += renderCard({
          img: d.img,
          title: d.title,
          date: d.date,
          desk: d.desk,
          onDelete: `deleteDokumentasi(${d.id})`
        });
      });
    });
}

dokumentasiForm?.addEventListener("submit", e => {
  e.preventDefault();
  fetch(DOKUMENTASI_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: dokumentasiJudul.value,
      desk: dokumentasiDesk.value,
      img: dokumentasiGambar.value,
      date: dokumentasiDate.value
    })
  }).then(() => {
    dokumentasiForm.reset();
    loadDokumentasi();
    loadDashboardCounts();
  });
});

window.deleteDokumentasi = id => {
  if (!confirm("Hapus dokumentasi?")) return;
  fetch(`${DOKUMENTASI_API}/${id}`, { method: "DELETE" })
    .then(() => {
      loadDokumentasi();
      loadDashboardCounts();
    });
};

/* =====================================================
   DASHBOARD COUNTER
===================================================== */
const countInfografis = document.getElementById("countInfografis");
const countInfo = document.getElementById("countInfo");
const countDokumentasi = document.getElementById("countDokumentasi");

function loadDashboardCounts() {
  fetch(`${API_BASE}/api/infografis`)
    .then(r => r.json())
    .then(d => countInfografis.textContent = d.length || 0);

  fetch(`${API_BASE}/api/berita`)
    .then(r => r.json())
    .then(d => countInfo.textContent = d.length || 0);

  fetch(`${API_BASE}/api/dokumentasi`)
    .then(r => r.json())
    .then(d => countDokumentasi.textContent = d.length || 0);
}

loadDashboardCounts();

/* =====================================================
   UTIL
===================================================== */
function hideAllSections() {
  document.querySelectorAll(
    "#adminSection, #infografisSection, #beritaSection, #dokumentasiSection"
  ).forEach(sec => sec.style.display = "none");

  cards.style.display = "none";
  welcome.style.display = "none";
}

function setActiveMenu(activeEl) {
  document.querySelectorAll(".sidebar nav a")
    .forEach(a => a.classList.remove("active"));
  activeEl?.classList.add("active");
}
