// js/dokumentasi.js
let fotoData = [];
let currentIndex = 0;

// Ambil data dari backend
fetch("http://localhost:3000/dokumentasi")
  .then(res => res.json())
  .then(data => {
    // simpan data ke array
    fotoData = data;

    // Urutkan di sini (ubah ASC/DESC sesuai kebutuhan)
    fotoData.sort((a, b) => new Date(a.date) - new Date(b.date)); // ASC (lama → baru)
    // fotoData.sort((a, b) => new Date(b.date) - new Date(a.date)); // DESC (baru → lama)

    renderCards();   // render grid setelah data berhasil diambil
  })
  .catch(err => console.error("Gagal ambil data:", err));


// Fungsi helper untuk format tanggal
// fungsi format tanggal tetap sama
function formatTanggal(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

fotoData.sort((a, b) => new Date(b.date) - new Date(a.date));


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

  // Format tanggal
  let tanggal = new Date(item.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDate").innerText = tanggal;
  document.getElementById("detailDesc").innerHTML = item.desc;
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
