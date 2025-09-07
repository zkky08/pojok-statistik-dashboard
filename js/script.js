
// Info Terbaru
const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".slider-track"); // ✅ tambahkan ini
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let slideInterval;
const intervalTime = 3000; // ganti durasi di sini (ms) → 4000 = 4 detik

// Buat dots sesuai jumlah slide
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dots button");

function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
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

// ✅ Pause ketika hover slider
const slider = document.querySelector(".slider");
slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
slider.addEventListener("mouseleave", startInterval);

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// animasi section info terbaru
document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("info-terbaru");

  function checkVisibility() {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add("show");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});

// Hero Section
// Parallax effect
const hero = document.querySelector('.hero::before'); // Pseudo-element tidak bisa di-query langsung
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Latar belakang bergerak lebih lambat dibanding scroll konten
  heroSection.style.setProperty('--bg-position', `${scrollY * 0.5}px`);
});


// Kontak
const contactSection = document.querySelector('.contact-section');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Background bergerak lebih lambat dibanding scroll konten
  contactSection.style.setProperty('--bg-position', `${scrollY * 0.3}px`);
});


// tombol back-to-top
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

// Email Otomatis
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const userEmail = document.getElementById("userEmail");
  const userQuestion = document.getElementById("userQuestion");

  const emailError = document.getElementById("emailError");
  const emailSuccess = document.getElementById("emailSuccess");
  const questionError = document.getElementById("questionError");
  const questionSuccess = document.getElementById("questionSuccess");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    // Reset state sebelum validasi baru dijalankan 
    [userEmail, userQuestion].forEach(el => {
      el.classList.remove("border-red-600", "border-green-600");
    });
    [emailError, emailSuccess, questionError, questionSuccess].forEach(el => { 
      el.textContent = "";
      el.classList.add("hidden");
    });

    // Validasi email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Pola dasar email sederhana
      emailError.textContent = "Email tidak boleh kosong!";
    if (!emailPattern.test(userEmail.value.trim())) { // Cek format email
      emailError.textContent = "Masukkan alamat email yang valid!";
      emailError.classList.remove("hidden");
      userEmail.classList.add("border-red-600");
      isValid = false; // Set isValid ke false
    } else {
      emailSuccess.textContent = "Email valid ✅";
      emailSuccess.classList.remove("hidden");
      userEmail.classList.add("border-green-600");
    }

    // Validasi pertanyaan
    if (userQuestion.value.trim() === "") { // Cek kalau kosong
      questionError.textContent = "Pertanyaan tidak boleh kosong!";
      questionError.classList.remove("hidden");
      userQuestion.classList.add("border-red-600");
      isValid = false; // Set isValid ke false
    } else {
      questionSuccess.textContent = "Pertanyaan siap dikirim ✅";
      questionSuccess.classList.remove("hidden");
      userQuestion.classList.add("border-green-600");
    }

    // Kalau ada error → hentikan
    if (!isValid) return;

    // Kalau valid → buka email
    const emailTujuan = "bpsbanten@bps.go.id"; // Ganti dengan email tujuan yang diinginkan
    const subject = encodeURIComponent(userQuestion.value.trim()); // Gunakan pertanyaan sebagai subjek
    const body = encodeURIComponent(
      "Email: " + userEmail.value.trim() + "\n\nPertanyaan:\n" + userQuestion.value.trim()
    );

    window.location.href = `mailto:${emailTujuan}?subject=${subject}&body=${body}`;
  });
});


