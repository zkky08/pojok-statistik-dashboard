// Data foto dokumentasi (dummy)
const fotoData = {
  foto1: { 
    title: "Kegiatan EKSOTIK", 
    desc: "Foto di atas memperlihatkan suasana kegiatan pembelajaran yang berlangsung di ruang kelas. Kegiatan ini diisi oleh pemateri/dosen yang sedang menyampaikan materi di depan kelas, sementara para peserta/mahasiswa mengikuti dengan antusias dan tertib. Seluruh peserta duduk dengan rapi serta memperhatikan penjelasan yang diberikan. Fasilitas ruang kelas dilengkapi pencahayaan yang baik, proyektor untuk presentasi, serta tata ruang yang mendukung suasana belajar kondusif. Dokumentasi ini menunjukkan bahwa kegiatan berlangsung dengan lancar, interaktif, dan sesuai dengan tujuan yang telah direncanakan.",
    img: "/assets/dokumentasi/eksotik_23_10_24_(1).jpeg", 
    date: "23 Oktober 2024" 
  },
  foto2: { 
    title: "Kegiatan EKSOTIK", 
    desc: "Foto ini mendokumentasikan kegiatan EKSOTIK Pojok Statistik UNIBA yang dilaksanakan pada bulan Desember 2024. Terlihat pemateri sedang menyampaikan materi di depan kelas dengan menggunakan perangkat presentasi, sementara para peserta mengikuti dengan serius dan antusias. Suasana ruang kelas mendukung jalannya kegiatan dengan tata ruang yang rapi serta fasilitas yang memadai. Dokumentasi ini menunjukkan bahwa kegiatan berlangsung lancar, interaktif, serta memberikan manfaat akademik bagi peserta.",
    img: "/assets/dokumentasi/eksotik_10_12_24_(2).jpeg", 
    date: "10 Desember 2024" 
  },
  foto3: { 
    title: "Rapat Pojok Statistik", 
    desc: "Foto ini mendokumentasikan kegiatan rapat yang dilaksanakan di ruang Pojok Statistik Universitas Bina Bangsa (UNIBA). Terlihat beberapa peserta rapat sedang berdiskusi secara serius terkait pengembangan program serta pemanfaatan fasilitas Pojok Statistik sebagai pusat pembelajaran data dan literasi statistik. Latar belakang ruangan menampilkan identitas Pojok Statistik dengan berbagai poster informasi dan papan nama resmi. Dokumentasi ini menunjukkan suasana rapat yang kondusif, komunikatif, dan berorientasi pada penguatan kegiatan akademik maupun literasi statistik di lingkungan kampus.",
    img: "/assets/dokumentasi/rapat_potik.jpeg", 
    date: "15 Maret 2025" 
  },
  foto4: { 
    title: "Pembinaan Agen Pojok Statistik", 
    desc: "Foto ini mendokumentasikan kegiatan Pembinaan Agen Pojok Statistik yang diselenggarakan pada bulan November 2024. Kegiatan berlangsung di ruang kelas dengan suasana yang kondusif, di mana narasumber berdiri di depan ruangan memberikan arahan dan materi pembinaan kepada para peserta. Para agen Pojok Statistik tampak antusias dan aktif mengikuti kegiatan, mencerminkan semangat untuk meningkatkan kapasitas serta peran mereka dalam mendukung literasi dan pemanfaatan data statistik di lingkungan kampus. Dokumentasi ini menunjukkan bahwa kegiatan pembinaan berjalan dengan baik, interaktif, dan sesuai dengan tujuan penguatan kompetensi agen Pojok Statistik..",
    img: "/assets/dokumentasi/pembinaan_agen_11_24.jpeg", 
    date: "20 Maret 2025" 
  },
  foto5: { 
    title: "Pembinaan Desain Publikasi", 
    desc: "Foto ini mendokumentasikan kegiatan Pembinaan Agen Pojok Statistik yang difokuskan pada pembuatan layout desain publikasi dan infografis. Dalam kegiatan ini, peserta dibimbing langsung oleh pendamping untuk memahami teknik penyusunan desain publikasi berbasis data serta penyajian informasi dalam bentuk infografis yang menarik dan mudah dipahami. Terlihat para agen aktif berdiskusi, mencatat, serta berlatih menggunakan materi pendukung. Dokumentasi ini menunjukkan suasana pembinaan yang interaktif, kreatif, dan bertujuan untuk meningkatkan keterampilan agen Pojok Statistik dalam mengolah serta menyebarluaskan informasi statistik secara visual.",
    img: "/assets/dokumentasi/pembinaan_agen_LayoutDesignPublikasi.jpeg", 
    date: "Dd Mm Yyyy" 
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
    <img src="${item.img}" alt="${item.title}" class="w-full h-44 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105">

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
