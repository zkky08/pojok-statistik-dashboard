// Deskripsi Infografis
const data = {
  kemiskinan: {
    title: "Kemiskinan di Banten 2024",
    desc: "Tingkat kemiskinan di Provinsi Banten pada tahun 2024 tercatat sebesar 5,58%. Angka ini menunjukkan adanya penurunan dibanding tahun sebelumnya, mencerminkan perbaikan kondisi sosial ekonomi masyarakat.",
    img: "/assets/infografis/Infografis pojok_Kemiskinan@4x.png"
  },
  naker: {
    title: "Ketenagakerjaan di Banten 2024",
    desc: "Provinsi Banten pada tahun 2024 menunjukkan dinamika ketenagakerjaan yang cukup positif. Tingkat partisipasi angkatan kerja meningkat seiring pertumbuhan ekonomi daerah, meski kualitas tenaga kerja masih perlu ditingkatkan.",
    img: "/assets/infografis/Infografis Naker@4x.png"
  },
  ekspor: {
    title: "Perkembangan Ekspor Nonmigas Banten 2025",
    desc: "Pada tahun 2025, ekspor nonmigas Provinsi Banten menunjukkan tren pertumbuhan positif. Produk kimia, tekstil, dan baja menjadi penyumbang utama.",
    img: "/assets/infografis/Ekspor2@3x-100.jpg"
  },
  iklim: {
    title: "Keadaan Iklim Banten 2023",
    desc: "Kondisi iklim di Provinsi Banten pada tahun 2023 menunjukkan variasi signifikan. Curah hujan tinggi berdampak pada sektor pertanian, sementara suhu rata-rata panas memengaruhi kesehatan masyarakat.",
    img: "/assets/infografis/KamisInfografis@4x.png"
  }
};

const params = new URLSearchParams(window.location.search);
let id = params.get("id");

const keys = Object.keys(data);
let currentIndex = keys.indexOf(id);

const detailSection = document.getElementById("detailSection");

// Fungsi render detail + animasi
function renderDetail(index) {
  const item = data[keys[index]];
  document.getElementById("listSection").classList.add("hidden");
  detailSection.classList.remove("hidden");

  // reset animasi
  detailSection.classList.remove("show");
  void detailSection.offsetWidth; 
  detailSection.classList.add("fade");

  // isi konten
  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDesc").innerText = item.desc;
  document.getElementById("detailImg").src = item.img;
  document.getElementById("downloadBtn").href = item.img; // bisa diubah ke file PDF/ZIP kalau ada

  // tampilkan animasi
  setTimeout(() => detailSection.classList.add("show"), 50);

  // update url
  window.history.replaceState(null, "", `?id=${keys[index]}`);
  currentIndex = index;
}


// Navigasi Next/Prev
document.getElementById("nextBtn")?.addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % keys.length;
  renderDetail(nextIndex);
});

document.getElementById("prevBtn")?.addEventListener("click", () => {
  let prevIndex = (currentIndex - 1 + keys.length) % keys.length;
  renderDetail(prevIndex);
});

// Jika ada id di URL → tampilkan detail
if (id && data[id]) {
  renderDetail(currentIndex);
}

// Halaman Daftar Infografis
// Animasi fade-in waterfall saat halaman di-load
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in");
  fadeEls.forEach((el, index) => {
    // kasih delay sesuai urutan
    el.style.transitionDelay = `${index * 0.2}s`;
    // trigger animasi
    requestAnimationFrame(() => {
      el.classList.add("show");
    });
  });
});
