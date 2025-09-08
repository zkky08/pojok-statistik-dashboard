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
