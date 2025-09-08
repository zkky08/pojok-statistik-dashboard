// Data semua berita
const beritaData = {
  berita1: { title: "BPS Goes to School: Edukasi Pentingnya Data Kependudukan dan Lembaga Keuangan", desc: "Badan Pusat Statistik (BPS) Provinsi Banten mengadakan kegiatan BPS Goes to School di BPK PENABUR SMAK Penabur Serang pada 15 Mei 2025...", img: "/assets/buletin/info-terbaru/Penabur 15052025@2x-100 (1).jpg", date: "7 September 2025" },
  berita2: { title: "BPS Goes to Campus: Komunikasi Data Statistik di Era Digital", desc: "Badan Pusat Statistik (BPS) Provinsi Banten menyelenggarakan kuliah tamu bertajuk...", img: "/assets/buletin/info-terbaru/Humas 26022025@4x (1).png", date: "6 September 2025" },
  berita3: { title: "Edustat-Talk Series #2 Bahas Pemanfaatan Data Statistik di Sektor Industri", desc: "Pojok Statistik Nasional menggelar Edustat-Talk Series #2 dengan tema pemanfaatan data dalam kegiatan administrasi statistik di sektor industri...", img: "/assets/buletin/info-terbaru/Pamfleet Edustat 2 (1).jpg", date: "5 September 2025" },
  berita4: { title: "Pembinaan Desain Publikasi dan Infografis untuk Mahasiswa", desc: "Kegiatan pembinaan desain publikasi dan infografis ini diikuti oleh mahasiswa guna meningkatkan keterampilan mereka dalam menyusun konten visual...", img: "/assets/buletin/info-terbaru/Pembinaan Layout Design Publikasi dan Infografis (1).jpeg", date: "4 September 2025" },
  berita5: { title: "Pembinaan Agen Statistik Mahasiswa", desc: "Kegiatan pembinaan agen statistik dilaksanakan dengan melibatkan mahasiswa sebagai peserta aktif. Melalui forum ini...", img: "/assets/buletin/info-terbaru/Pembinaan agen 1124 (4).jpeg", date: "4 September 2025" },
  berita6: { title: "Eksotik: Kegiatan Statistik Mahasiswa", desc: "Kegiatan pembinaan agen statistik dilaksanakan dengan melibatkan mahasiswa sebagai peserta aktif. Melalui forum ini...", img: "/assets/buletin/info-terbaru/Eksotik 101224 (2).jpeg", date: "4 September 2025" }
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

  currentIndex = index;
}

// ================= NAVIGASI =================
document.getElementById("backBtn")?.addEventListener("click", () => {
  document.getElementById("detailBerita").classList.add("hidden");
  document.getElementById("info-terbaru").classList.remove("hidden");
});

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
