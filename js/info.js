// ================= DATA BERITA =================
const beritaData = {
  berita1: {
    title: "BPS Goes to School: Edukasi Pentingnya Data Kependudukan dan Lembaga Keuangan",
    date: "7 September 2025",
    desc: "Badan Pusat Statistik (BPS) Provinsi Banten mengadakan kegiatan BPS Goes to School di BPK PENABUR SMAK Penabur Serang pada 15 Mei 2025...",
    img: "/assets/buletin/info-terbaru/Penabur 15052025@2x-100 (1).jpg",
    file: "/assets/materi/berita1.pdf"
  },
  berita2: {
    title: "BPS Goes to Campus: Komunikasi Data Statistik di Era Digital",
    date: "6 September 2025",
    desc: "Badan Pusat Statistik (BPS) Provinsi Banten menyelenggarakan kuliah tamu bertajuk...",
    img: "/assets/buletin/info-terbaru/Humas 26022025@4x (1).png",
    file: "/assets/materi/berita2.pdf"
  },
  berita3: {
    title: "Edustat-Talk Series #2 Bahas Pemanfaatan Data Statistik di Sektor Industri",
    date: "5 September 2025",
    desc: "Pojok Statistik Nasional menggelar Edustat-Talk Series #2 dengan tema pemanfaatan data...",
    img: "/assets/buletin/info-terbaru/Pamfleet Edustat 2 (1).jpg",
    file: "/assets/materi/berita3.pdf"
  }
};

const keysBerita = Object.keys(beritaData);
let currentIndex = 0;

// ================= GENERATE CARD =================
const newsGrid = document.querySelector('#info-terbaru .grid');

keysBerita.forEach((key, idx) => {
  const item = beritaData[key];

  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col news-card opacity-0 translate-y-8 duration-700 ease-out cursor-pointer';

  card.innerHTML = `
    <img src="${item.img}" alt="${item.title}" class="w-full h-44 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105">
    <div class="p-4 flex flex-col flex-grow">
      <p class="text-sm text-gray-500 mb-1">${item.date}</p>
      <h3 class="text-lg font-semibold mb-2">${item.title}</h3>
      <p class="text-gray-700 text-sm flex-grow">${item.desc}</p>
    </div>
  `;

  card.addEventListener('click', () => renderBerita(idx));
  newsGrid.appendChild(card);
});

// ================= RENDER DETAIL =================
function renderBerita(index) {
  const item = beritaData[keysBerita[index]];
  document.getElementById("info-terbaru").classList.add("hidden");
  const detailSection = document.getElementById("detailBerita");
  detailSection.classList.remove("hidden");

  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDate").innerText = item.date;
  document.getElementById("detailDesc").innerText = item.desc;
  document.getElementById("detailImg").src = item.img;

  // ✅ Fix tombol download
  document.getElementById("downloadBtn").onclick = () => {
    if (item.file) {
      window.location.href = item.file; // langsung download
    } else {
      alert("File materi belum tersedia.");
    }
  };

  currentIndex = index;
}

// ================= NAVIGASI =================
document.getElementById("nextBtn").addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % keysBerita.length;
  renderBerita(nextIndex);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  let prevIndex = (currentIndex - 1 + keysBerita.length) % keysBerita.length;
  renderBerita(prevIndex);
});

// ================= ANIMASI FADE-IN =================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".news-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});
