// =============================
// Info Terbaru
// =============================
const infoSection = document.getElementById("info-terbaru");
const slides = infoSection.querySelectorAll(".slide");
const track = infoSection.querySelector(".slider-track");
const prevBtn = infoSection.querySelector(".prev");
const nextBtn = infoSection.querySelector(".next");
const dotsContainer = infoSection.querySelector(".dots");

let index = 0;
let slideInterval;
const intervalTime = 3000; // 3000 ms = 3 detik

// Buat dots sesuai jumlah slide
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll("button");

function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
  if (dots.length > 0) {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }
}

function goToSlide(i) {
  index = i;
  updateSlide();
  resetInterval();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
}

// Event tombol
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto play
function startInterval() {
  slideInterval = setInterval(nextSlide, intervalTime);
}
function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}
startInterval();

// Pause ketika hover slider
const slider = infoSection.querySelector(".slider");
slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
slider.addEventListener("mouseleave", startInterval);

// Animasi muncul saat discroll
function checkVisibility() {
  const rect = infoSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    infoSection.classList.add("show");
    window.removeEventListener("scroll", checkVisibility);
  }
}
window.addEventListener("scroll", checkVisibility);
checkVisibility();

// =============================
// Hero Section - Parallax
// =============================
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Gunakan CSS variable untuk background position ::before
  heroSection.style.setProperty('--bg-position', `${scrollY * 0.5}px`);
});

// =============================
// Contact Section - Parallax
// =============================
const contactSection = document.querySelector('.contact-section');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  contactSection.style.setProperty('--bg-position', `${scrollY * 0.3}px`);
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

// =============================
// Form Kontak Index - Email Otomatis
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const formIndex = document.getElementById("contactFormIndex");
  if (formIndex) {
    const userEmailIndex = document.getElementById("userEmailIndex");
    const userQuestionIndex = document.getElementById("userQuestionIndex");
    const emailErrorIndex = document.getElementById("emailErrorIndex");
    const questionErrorIndex = document.getElementById("questionErrorIndex");

    formIndex.addEventListener("submit", function(e) {
      e.preventDefault();
      let isValid = true;

      emailErrorIndex.textContent = "";
      emailErrorIndex.classList.add("hidden");
      userEmailIndex.classList.remove("border-red-600");

      questionErrorIndex.textContent = "";
      questionErrorIndex.classList.add("hidden");
      userQuestionIndex.classList.remove("border-red-600");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(userEmailIndex.value.trim())) {
        emailErrorIndex.textContent = "Masukkan alamat email yang valid!";
        emailErrorIndex.classList.remove("hidden");
        userEmailIndex.classList.add("border-red-600");
        isValid = false;
      }

      if (userQuestionIndex.value.trim() === "") {
        questionErrorIndex.textContent = "Pertanyaan tidak boleh kosong!";
        questionErrorIndex.classList.remove("hidden");
        userQuestionIndex.classList.add("border-red-600");
        isValid = false;
      }

      if (!isValid) return;

      const emailTujuan = "bps3600@bps.go.id";
      const subject = encodeURIComponent(userQuestionIndex.value.trim());
      const body = encodeURIComponent(
        "Email: " + userEmailIndex.value.trim() + "\n\nPertanyaan:\n" + userQuestionIndex.value.trim()
      );

      window.location.href = `mailto:${emailTujuan}?subject=${subject}&body=${body}`;
    });
  }
});
// =============================

// =============================
// Search Suggestion (updated)
// =============================
const input = document.getElementById("searchInput");
const typeSelect = document.getElementById("typeSelect");
const suggestionsBox = document.getElementById("suggestions");

// alamat backend (pakai host:port tempat express berjalan)
const API_BASE = "http://localhost:3000"; // kalau servermu di 127.0.0.1:3000, ganti jadi "http://127.0.0.1:3000"

input.addEventListener("input", async () => {
  const query = input.value.trim();
  const type = typeSelect.value;

  // minimal 2 karakter agar tidak spam request
  if (query.length < 2 || !type) {
    suggestionsBox.innerHTML = "";
    suggestionsBox.classList.add("hidden");
    return;
  }

  try {
    const url = `${API_BASE}/search?type=${encodeURIComponent(type)}&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);

    // cek dulu status response, kalau bukan OK jangan panggil res.json()
    if (!res.ok) {
      console.error("Search request failed:", res.status, res.statusText);
      suggestionsBox.innerHTML = `<div class="p-2 text-sm text-gray-500">Terjadi kesalahan (kode ${res.status}).</div>`;
      suggestionsBox.classList.remove("hidden");
      return;
    }

    const data = await res.json();

    // Batasi maksimal 5 hasil di frontend
    const limitedData = data.slice(0, 3);

    suggestionsBox.innerHTML = "";
    if (Array.isArray(data) && data.length > 0) {
      data.forEach(row => {
        // aman: dukung beberapa kemungkinan nama kolom (title / judul / name)
        const label = row.title ?? row.judul ?? row.name ?? Object.values(row)[1] ?? Object.values(row)[0] ?? "";
        const id = row.id ?? row.ID ?? "";

        const item = document.createElement("div");
        item.textContent = label;
        item.dataset.id = id;
        item.className = "p-2 cursor-pointer hover:bg-gray-200";
        item.addEventListener("click", () => {
          input.value = label;
          suggestionsBox.classList.add("hidden");

          // opsi: arahkan ke halaman detail jika mau
          if (type === 'dokumentasi') window.location.href = `/dokumentasi.html?id=${id}`;
          if (type === 'infografis') window.location.href = `/infografis.html?id=${id}`;
          if (type === 'berita') window.location.href = `/berita.html?id=${id}`;
        });
        suggestionsBox.appendChild(item);
      });
      suggestionsBox.classList.remove("hidden");
    } else {
      suggestionsBox.innerHTML = `<div class="p-2 text-sm text-gray-500">Tidak ada hasil</div>`;
      suggestionsBox.classList.remove("hidden");
    }
  } catch (err) {
    console.error("Error fetch:", err);
    suggestionsBox.innerHTML = `<div class="p-2 text-sm text-gray-500">Gagal menghubungi server.</div>`;
    suggestionsBox.classList.remove("hidden");
  }
});

// klik di luar tutup dropdown
document.addEventListener("click", (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== input) {
    suggestionsBox.classList.add("hidden");
  }
});



// Accordion FAQ
const faqButtons = document.querySelectorAll(".faq-btn");
faqButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector("span");
    content.classList.toggle("hidden");
    icon.textContent = content.classList.contains("hidden") ? "+" : "-";
  });
});
