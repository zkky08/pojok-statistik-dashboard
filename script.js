
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

