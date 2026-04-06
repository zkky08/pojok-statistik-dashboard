// ================= DATA DOKUMENTASI =================
let fotoData = [];
let currentIndex = 0;

// Ambil data dari backend
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const dokId = params.get("id");

  fetch("http://localhost:3000/dokumentasi")
    .then(res => res.json())
    .then(data => {
      fotoData = data;

      // urutkan ASC (lama ke baru)
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      if (dokId) {
        // cari index sesuai ID
        const index = data.findIndex(item => item.id == dokId || item.ID == dokId);
        if (index !== -1) {
          renderFoto(index); // langsung render detail
        } else {
          renderCards(); // fallback
        }
      } else {
        renderCards(); // default daftar card
      }
    })
    .catch(err => console.error("Gagal ambil data dokumentasi:", err));
});

// ================= Fungsi Format Tanggal (Konsisten) =================
function formatTanggal(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Generate Card
function renderCards() {
  const grid = document.querySelector('#dokumentasi .grid');
  grid.innerHTML = ""; // bersihkan isi sebelumnya

  fotoData.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'doc-card';

    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" 
           class="w-full h-44 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105">

      <div class="content">
        <p class="text-sm text-gray-500 mb-1">${formatTanggal(item.date)}</p>
        <h3 class="text-lg font-semibold mb-2">${item.title}</h3>
      </div>
    `;

    card.addEventListener('click', () => renderFoto(idx));
    grid.appendChild(card);
  });
}

// Render Detail
function renderFoto(index) {
  const item = fotoData[index];
  document.getElementById("dokumentasi").classList.add("hidden");
  const detail = document.getElementById("detailDokumentasi");
  detail.classList.remove("hidden");

  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDate").innerText = formatTanggal(item.date);
  document.getElementById("detailDesc").innerHTML = item.desk;
  document.getElementById("detailImg").src = item.img;

  currentIndex = index;
}

// Navigasi
document.getElementById("nextBtn").addEventListener("click", () => {
  let next = (currentIndex + 1) % fotoData.length;
  renderFoto(next);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  let prev = (currentIndex - 1 + fotoData.length) % fotoData.length;
  renderFoto(prev);
});

// =============================
// Tombol Back-to-Top
// =============================
const backToTopBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// =============================