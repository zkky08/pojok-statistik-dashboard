// ================= DATA INFOGRAFIS =================
let infografisData = [];
let currentIndex = 0;

// Ambil data dari backend
fetch("http://localhost:3000/infografis")
  .then(res => res.json())
  .then(data => {
    infografisData = data;

    // ASC → lama ke baru
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    renderCards();
  })
  .catch(err => console.error("Gagal ambil data infografis:", err));

// ================= Fungsi Format Tanggal (Konsisten) =================
function formatTanggal(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// ================= Generate Card =================
function renderCards() {
  const grid = document.querySelector('#infografis .grid');
  grid.innerHTML = ""; // bersihkan isi sebelumnya

  infografisData.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'info-card';

    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" 
           class="w-full h-44 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105">

      <div class="content">
        <p class="text-sm text-gray-500 mb-1">${formatTanggal(item.date)}</p>
        <h3 class="text-lg font-semibold mb-2">${item.title}</h3>
      </div>
    `;

    card.addEventListener('click', () => renderDetail(idx));
    grid.appendChild(card);
  });
}

// ================= Render Detail =================
function renderDetail(index) {
  const item = infografisData[index];
  document.getElementById("infografis").classList.add("hidden");
  const detail = document.getElementById("detailSection");
  detail.classList.remove("hidden");

  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDate").innerText = formatTanggal(item.date);
  document.getElementById("detailDesc").innerHTML = item.desk;
  document.getElementById("detailImg").src = item.img;

  // Tombol download
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.onclick = () => {
    const link = document.createElement("a");
    link.href = item.img;
    link.download = item.title.replace(/\s+/g, "_") + ".jpg";
    link.click();
  };

  currentIndex = index;
}

// ================= Navigasi =================
document.getElementById("nextBtn").addEventListener("click", () => {
  let next = (currentIndex + 1) % infografisData.length;
  renderDetail(next);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  let prev = (currentIndex - 1 + infografisData.length) % infografisData.length;
  renderDetail(prev);
});

// ================= Tombol Back-to-Top =================
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
