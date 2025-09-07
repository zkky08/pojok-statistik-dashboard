// Animasi muncul saat scroll
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.news-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target); // biar cuma muncul sekali
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

const beritaData = {
  berita1: {
    title: "BPS Goes to School: Edukasi Pentingnya Data Kependudukan dan Lembaga Keuangan",
    desc: "Badan Pusat Statistik (BPS) Provinsi Banten mengadakan kegiatan BPS Goes to School di BPK PENABUR SMAK Penabur Serang pada 15 Mei 2025...",
    img: "/assets/buletin/info-terbaru/Penabur 15052025@2x-100 (1).jpg",
    date: "7 September 2025"
  },
  berita2: {
    title: "BPS Goes to Campus: Komunikasi Data Statistik di Era Digital",
    desc: "Badan Pusat Statistik (BPS) Provinsi Banten menyelenggarakan kuliah tamu bertajuk...",
    img: "/assets/buletin/info-terbaru/Humas 26022025@4x (1).png",
    date: "6 September 2025"
  },
  berita3: {
    title: "Edustat-Talk Series #2 Bahas Pemanfaatan Data Statistik di Sektor Industri",
    desc: "Pojok Statistik Nasional menggelar Edustat-Talk Series #2 dengan tema pemanfaatan data dalam kegiatan administrasi statistik di sektor industri...",
    img: "/assets/buletin/info-terbaru/Pamfleet Edustat 2 (1).jpg",
    date: "5 September 2025"
  }
  // Tambahkan berita4, berita5, berita6 ...
};

const keysBerita = Object.keys(beritaData);
let currentIndex = 0;

function renderBerita(index) {
  const item = beritaData[keysBerita[index]];
  document.getElementById("info-terbaru").classList.add("hidden");
  const detailSection = document.getElementById("detailBerita");
  detailSection.classList.remove("hidden");

  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDate").innerText = item.date;
  document.getElementById("detailDesc").innerText = item.desc;
  document.getElementById("detailImg").src = item.img;

  currentIndex = index;
}

// Klik card untuk buka detail
document.querySelectorAll(".news-card").forEach((card, idx) => {
  card.addEventListener("click", () => renderBerita(idx));
});

// Tombol Kembali
document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("detailBerita").classList.add("hidden");
  document.getElementById("info-terbaru").classList.remove("hidden");
});

// Navigasi Next/Prev
document.getElementById("nextBtn").addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % keysBerita.length;
  renderBerita(nextIndex);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  let prevIndex = (currentIndex - 1 + keysBerita.length) % keysBerita.length;
  renderBerita(prevIndex);
});
