// Deskripsi Infografis
const data = {
  kemiskinan: {
  title: "Kemiskinan di Banten 2024",
  desc: `
  <p>
    Berdasarkan data <b>Badan Pusat Statistik (BPS) Provinsi Banten</b> tahun 2024, 
    persentase penduduk miskin di Provinsi Banten tercatat sebesar 
    <b>5,58%</b>. Angka ini menunjukkan bahwa dari setiap 100 penduduk, 
    sekitar 5 hingga 6 orang masih hidup di bawah garis kemiskinan.
  </p>

  <p class="mt-4">
    Selain itu, terdapat <b>tiga kabupaten</b> dengan persentase penduduk miskin tertinggi di Banten, yaitu:
  </p>

  <ol class="list-decimal pl-6 space-y-2 mt-2">
    <li><b>Kabupaten Pandeglang</b> – sebesar <b>9,18%</b></li>
    <li><b>Kabupaten Lebak</b> – sebesar <b>8,44%</b></li>
    <li><b>Kabupaten Tangerang</b> – sebesar <b>6,55%</b></li>
  </ol>

  <p class="mt-4">
    Data ini menggambarkan bahwa meskipun secara umum angka kemiskinan di Banten relatif rendah, 
    masih terdapat <b>ketimpangan antarwilayah</b>. 
    Pandeglang dan Lebak sebagai wilayah dengan karakteristik pedesaan dan ketergantungan pada sektor pertanian 
    menunjukkan angka kemiskinan yang lebih tinggi dibandingkan wilayah lain. 
    Sementara itu, Kabupaten Tangerang yang merupakan kawasan penyangga ibu kota juga masih mencatat angka kemiskinan cukup signifikan 
    meskipun berada di kawasan industri.
  </p>

  <p class="mt-4">
    Informasi ini diharapkan menjadi <b>dasar dalam penyusunan kebijakan</b> pemerintah daerah, akademisi, maupun pihak terkait lainnya 
    untuk menekan angka kemiskinan melalui <b>program-program yang tepat sasaran</b>, terutama di daerah dengan tingkat kemiskinan tertinggi.
  </p>
`,
  img: "/assets/infografis/Infografis pojok_Kemiskinan@4x.png"
},


  naker: {
    title: "Ketenagakerjaan di Banten 2024",
    desc: `
      <p>
        Infografis ini menyajikan beberapa fakta penting terkait 
        <b>ketenagakerjaan di Provinsi Banten tahun 2024</b> berdasarkan hasil 
        Survei Angkatan Kerja Nasional (Sakernas) yang dilakukan oleh 
        <b>Badan Pusat Statistik (BPS)</b>.
      </p>

      <p>
        Berdasarkan lapangan usaha, jumlah penduduk usia 15 tahun ke atas 
        yang bekerja di sektor <b>konstruksi</b> mengalami peningkatan terbesar 
        dibandingkan tahun sebelumnya, yaitu sekitar <b>113,77 ribu orang</b>. 
        Hal ini menunjukkan bahwa pembangunan infrastruktur masih menjadi salah 
        satu penggerak utama penyerapan tenaga kerja di Banten.
      </p>

      <p>
        Dari sisi tingkat pengangguran terbuka (TPT), angka tertinggi tercatat 
        pada kelompok penduduk dengan pendidikan <b>SMP</b>, yaitu sebesar 
        <b>9,35%</b>. Sementara itu, TPT terendah sebesar <b>2,03%</b> terdapat 
        pada kelompok penduduk dengan pendidikan <b>Diploma</b>. Temuan ini menegaskan 
        bahwa semakin tinggi jenjang pendidikan seseorang, semakin besar pula 
        peluangnya untuk masuk ke dunia kerja.
      </p>

      <p>
        Jika ditinjau dari sektor usaha, terdapat dua sektor yang mendominasi 
        penyerapan tenaga kerja, yakni:
      </p>
      <ol class="list-decimal pl-6 space-y-2 mt-2">
        <li><b>Perdagangan</b> – sebesar <b>21,37%</b></li>
        <li><b>Industri Pengolahan</b> – sebesar <b>19,22%</b></li>
      </ol>

      <p>
        Lebih lanjut, dari total sekitar <b>5,8 juta orang</b> yang bekerja di Banten, 
        sekitar <b>50,54%</b> di antaranya berstatus sebagai 
        <b>buruh/karyawan/pegawai</b>. Hal ini menunjukkan bahwa sebagian besar pekerja 
        di Banten masih berada pada sektor formal, dengan hubungan kerja yang lebih 
        terstruktur dibandingkan pekerja mandiri atau sektor informal.
      </p>

      <p>
        Secara keseluruhan, data ini memberikan gambaran bahwa 
        <b>konstruksi, perdagangan, dan industri pengolahan</b> masih menjadi sektor strategis 
        dalam penyerapan tenaga kerja di Banten. Namun, tantangan tetap ada terutama pada 
        kelompok berpendidikan rendah, yang memiliki tingkat pengangguran terbuka lebih tinggi. 
        Informasi ini diharapkan menjadi landasan bagi pemerintah daerah, akademisi, dan pemangku 
        kepentingan lainnya dalam menyusun program peningkatan kualitas tenaga kerja melalui 
        <b>pendidikan, pelatihan, serta penciptaan lapangan kerja yang lebih produktif dan berkelanjutan</b>.
      </p>
    `,
    img: "/assets/infografis/Infografis Naker@4x.png"
  },


  ekspor: {
    title: "Perkembangan Ekspor Nonmigas Banten 2025",
    desc: `
Pada tahun 2025, ekspor nonmigas Provinsi Banten menunjukkan tren pertumbuhan positif. 
Produk kimia, tekstil, dan baja menjadi penyumbang utama.
    `,
    img: "/assets/infografis/Ekspor2@3x-100.jpg"
  },
  iklim: {
    title: "Keadaan Iklim Banten 2023",
    desc: `
Kondisi iklim di Provinsi Banten pada tahun 2023 menunjukkan variasi signifikan. 
Curah hujan tinggi berdampak pada sektor pertanian, 
sementara suhu rata-rata panas memengaruhi kesehatan masyarakat.
    `,
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
  document.getElementById("detailDesc").innerHTML = item.desc;
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
