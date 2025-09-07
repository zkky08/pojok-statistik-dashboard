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
// Form Kontak - Email Otomatis
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const userEmail = document.getElementById("userEmail");
  const userQuestion = document.getElementById("userQuestion");
  const emailError = document.getElementById("emailError");
  const questionError = document.getElementById("questionError");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    // Reset error
    emailError.textContent = "";
    emailError.classList.add("hidden");
    userEmail.classList.remove("border-red-600");

    questionError.textContent = "";
    questionError.classList.add("hidden");
    userQuestion.classList.remove("border-red-600");

    // Validasi email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail.value.trim())) {
      emailError.textContent = "Masukkan alamat email yang valid!";
      emailError.classList.remove("hidden");
      userEmail.classList.add("border-red-600");
      isValid = false;
    }

    // Validasi pertanyaan
    if (userQuestion.value.trim() === "") {
      questionError.textContent = "Pertanyaan tidak boleh kosong!";
      questionError.classList.remove("hidden");
      userQuestion.classList.add("border-red-600");
      isValid = false;
    }

    if (!isValid) return;

    // Kalau valid → buka email client
    const emailTujuan = "bpsbanten@bps.go.id";
    const subject = encodeURIComponent(userQuestion.value.trim());
    const body = encodeURIComponent(
      "Email: " + userEmail.value.trim() + "\n\nPertanyaan:\n" + userQuestion.value.trim()
    );

    window.location.href = `mailto:${emailTujuan}?subject=${subject}&body=${body}`;
  });
});
