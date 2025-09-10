// Data foto dokumentasi (dummy)
const fotoData = {
  foto1: { 
    title: "Survey Pertanian 2025", 
    desc: "Tim melakukan pendataan lapangan di wilayah Serang untuk survey pertanian musiman.",
    img: "/assets/dokumentasi/eksotik_23_10_24_(1).jpeg", 
    date: "5 Maret 2025" 
  },
  foto2: { 
    title: "Sosialisasi Statistik Desa", 
    desc: "Sosialisasi pemanfaatan data statistik kepada masyarakat desa di Kabupaten Pandeglang.",
    img: "/assets/dokumentasi/eksotik_10_12_24_(2).jpeg", 
    date: "10 Maret 2025" 
  },
  foto3: { 
    title: "Pelatihan Enumerator", 
    desc: "Enumerator mendapatkan pembekalan sebelum turun ke lapangan.",
    img: "/assets/dokumentasi/rapat_potik.jpeg", 
    date: "15 Maret 2025" 
  },
  foto4: { 
    title: "Pendataan Ekonomi", 
    desc: "Pendataan ekonomi dilakukan di pasar tradisional untuk mengumpulkan data harga kebutuhan pokok.",
    img: "/assets/dokumentasi/pembinaan_agen_11_24.jpeg", 
    date: "20 Maret 2025" 
  },
  foto5: { 
    title: "Pendataan Ekonomi", 
    desc: "Pendataan ekonomi dilakukan di pasar tradisional untuk mengumpulkan data harga kebutuhan pokok.",
    img: "/assets/dokumentasi/pembinaan_agen_LayoutDesignPublikasi.jpeg", 
    date: "25 Maret 2025" 
  }
};

const keysFoto = Object.keys(fotoData);
let currentIndex = 0;

// Generate Card
const grid = document.querySelector('#dokumentasi .grid');
keysFoto.forEach((key, idx) => {
  const item = fotoData[key];
  const card = document.createElement('div');
  card.className = 'doc-card';

  card.innerHTML = `
    <img src="${item.img}" alt="${item.title}">
    <div class="content">
      <p class="text-sm text-gray-500 mb-1">${item.date}</p>
      <h3 class="text-lg font-semibold mb-2">${item.title}</h3>
    </div>
  `;

  card.addEventListener('click', () => renderFoto(idx));
  grid.appendChild(card);
});

// Render Detail
function renderFoto(index) {
  const item = fotoData[keysFoto[index]];
  document.getElementById("dokumentasi").classList.add("hidden");
  const detail = document.getElementById("detailDokumentasi");
  detail.classList.remove("hidden");

  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDate").innerText = item.date;
  document.getElementById("detailDesc").innerText = item.desc;
  document.getElementById("detailImg").src = item.img;

  currentIndex = index;
}

// Navigasi
document.getElementById("nextBtn").addEventListener("click", () => {
  let next = (currentIndex + 1) % keysFoto.length;
  renderFoto(next);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  let prev = (currentIndex - 1 + keysFoto.length) % keysFoto.length;
  renderFoto(prev);
});
