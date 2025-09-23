// ================= DATA INFO =================
let beritaData = [];
let currentIndex = 0;

// Ambil data dari backend
fetch("http://localhost:3000/info")
  .then(res => res.json())
  .then(data => {
    beritaData = data;

    // ASC → lama ke baru
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    renderCards();
  })
  .catch(err => console.error("Gagal ambil data berita:", err));

// ================= Fungsi Format Tanggal (Konsisten) =================
function formatTanggal(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Fungsi potong teks
function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Generate Card
function renderCards() {
  const newsGrid = document.querySelector('#info-terbaru .grid');
  newsGrid.innerHTML = "";

  beritaData.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col news-card opacity-0 translate-y-8 duration-700 ease-out cursor-pointer';

    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="w-full h-44 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105">
      <div class="p-4 flex flex-col flex-grow">
        <p class="text-sm text-gray-500 mb-1">${formatTanggal(item.date)}</p>
        <h3 class="text-lg font-semibold mb-2">${item.title}</h3>
        <p class="text-gray-700 text-sm flex-grow">
          ${truncateText(item.desk.replace(/<[^>]+>/g, ''), 120)}
        </p>
      </div>
    `;

    card.addEventListener('click', () => renderBerita(idx));
    newsGrid.appendChild(card);
  });

  // Animasi fade-in
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
}

// Render Detail
function renderBerita(index) {
  const item = beritaData[index];
  document.getElementById("info-terbaru").classList.add("hidden");
  const detailSection = document.getElementById("detailBerita");
  detailSection.classList.remove("hidden");

  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailDate").innerText = formatTanggal(item.date);
  document.getElementById("detailDesc").innerHTML = item.desk;
  document.getElementById("detailImg").src = item.img;

  currentIndex = index;
}

// Navigasi Next/Prev
document.getElementById("nextBtn").addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % beritaData.length;
  renderBerita(nextIndex);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  let prevIndex = (currentIndex - 1 + beritaData.length) % beritaData.length;
  renderBerita(prevIndex);
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
// ================= DATA DOKUMENTASI =================
