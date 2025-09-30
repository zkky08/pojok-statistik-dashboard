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
// === Search Suggestion — replace your previous search block with this ===
document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "http://localhost:3000"; // sesuaikan jika beda
  const input = document.getElementById("searchInput");
  const overlay = document.getElementById("autocompleteOverlay");
  const suggestions = document.getElementById("suggestions");
  const typeSelect = document.getElementById("typeSelect");

  let currentSuggestion = ""; // full label dari suggestion pertama (untuk commit)

  if (!input || !overlay || !suggestions) {
    console.warn("Autocomplete: elemen tidak lengkap (searchInput / autocompleteOverlay / suggestions).");
    return;
  }

  // Copy some computed styles from input -> overlay supaya text sejajar
  (function syncOverlayStyle() {
    const cs = window.getComputedStyle(input);
    // padding/font/line-height harus sama agar overlay nempel pas
    overlay.style.padding = cs.padding;
    overlay.style.font = cs.font;
    overlay.style.lineHeight = cs.lineHeight;
    overlay.style.height = cs.height;
    // pointer events none supaya input tetap menerima klik/ketik
    overlay.style.pointerEvents = "none";
  })();

  // helper: render overlay sebagai "query (transparent) + suffix (gray)"
  function renderOverlayFromLabel(label, query) {
    if (!label || !query) {
      overlay.innerHTML = "";
      currentSuggestion = "";
      return;
    }

    const lowerLabel = label.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIndex = lowerLabel.indexOf(lowerQuery);

    // hanya tampilkan overlay kalau query ada di label
    if (matchIndex === -1) {
      overlay.innerHTML = ""; // no visible autocomplete
      currentSuggestion = "";
      return;
    }

    // kita TIDAK menampilkan bagian 'before' (prefix) — hanya menampilkan suffix
    const suffix = label.slice(matchIndex + query.length);
    if (!suffix) {
      overlay.innerHTML = ""; // tidak ada yang perlu ditambahkan
      currentSuggestion = label;
      return;
    }

    // overlay = transparent(query) + gray(suffix)
    // note: menggunakan kelas Tailwind 'text-transparent' & 'text-gray-400' — kalau tidak pakai tailwind,
    // ganti dengan inline style: <span style="color:transparent">...</span> etc.
    overlay.innerHTML = `<span class="text-transparent">${escapeHtml(query)}</span><span class="text-gray-400">${escapeHtml(suffix)}</span>`;
    currentSuggestion = label;
  }

  // small helper to avoid XSS if labels contain HTML
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m];
    });
  }

  // fetch & render suggestions
  async function fetchAndRender(query, type) {
    // safety: require type (server.js expects type param). 
    if (!type) {
      // optional: you can allow searching across all types by changing server logic
      overlay.innerHTML = "";
      suggestions.innerHTML = "";
      suggestions.classList.add("hidden");
      currentSuggestion = "";
      return;
    }

    // server currently blocks q.length < 2 — jika kamu ingin 1-char search, ubah server.js
    if (!query || query.length < 1) {
      overlay.innerHTML = "";
      suggestions.innerHTML = "";
      suggestions.classList.add("hidden");
      currentSuggestion = "";
      return;
    }

    try {
      const url = `${API_BASE}/search?type=${encodeURIComponent(type)}&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Autocomplete fetch error:", res.status);
        overlay.innerHTML = "";
        suggestions.innerHTML = "";
        suggestions.classList.add("hidden");
        currentSuggestion = "";
        return;
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        overlay.innerHTML = "";
        suggestions.innerHTML = "";
        suggestions.classList.add("hidden");
        currentSuggestion = "";
        return;
      }

      // Normalize label field (server might use 'title' or 'judul' or 'name')
      const firstLabel = (data[0].title ?? data[0].judul ?? data[0].name ?? data[0].nama ?? "") + "";
      renderOverlayFromLabel(firstLabel, query);

      // render dropdown (limit 5)
      suggestions.innerHTML = "";
      const limited = data.slice(0, 5);
      limited.forEach(row => {
        const label = (row.title ?? row.judul ?? row.name ?? row.nama ?? "") + "";
        const id = row.id ?? row.ID ?? row.id_info ?? "";

        const div = document.createElement("div");
        div.className = "p-2 hover:bg-gray-100 cursor-pointer";
        div.textContent = label;
        div.addEventListener("click", () => {
          input.value = label;
          overlay.innerHTML = "";
          suggestions.innerHTML = "";
          suggestions.classList.add("hidden");
          currentSuggestion = "";

          // navigasi sesuai type (sesuaikan path bila perlu)
          if (type === "dokumentasi") window.location.href = `/dokumentasi.html?id=${id}`;
          else if (type === "infografis") window.location.href = `/infografis.html?id=${id}`;
          else if (type === "berita") window.location.href = `/info.html?id=${id}`;
        });
        suggestions.appendChild(div);
      });
      suggestions.classList.remove("hidden");
    } catch (err) {
      console.error("Error fetch autocomplete:", err);
      overlay.innerHTML = "";
      suggestions.innerHTML = "";
      suggestions.classList.add("hidden");
      currentSuggestion = "";
    }
  }

  // event input
  input.addEventListener("input", (e) => {
    const q = input.value;
    const type = typeSelect ? typeSelect.value : null;
    // NOTE: if your server requires q.length >= 2, adjust check accordingly
    if (!q || q.length < 1) {
      overlay.innerHTML = "";
      suggestions.innerHTML = "";
      suggestions.classList.add("hidden");
      currentSuggestion = "";
      return;
    }
    // fetch suggestions
    fetchAndRender(q, type);
  });

  // accept suggestion with Tab or ArrowRight
  input.addEventListener("keydown", (e) => {
    if ((e.key === "Tab" || e.key === "ArrowRight") && currentSuggestion) {
      e.preventDefault();
      input.value = currentSuggestion;
      overlay.innerHTML = "";
      suggestions.innerHTML = "";
      suggestions.classList.add("hidden");
      currentSuggestion = "";
    }
  });

  // click outside closes dropdown (but allow clicks on suggestions to register)
  document.addEventListener("click", (ev) => {
    if (!ev.target.closest("#searchInput") && !ev.target.closest("#suggestions")) {
      suggestions.classList.add("hidden");
      overlay.innerHTML = "";
      currentSuggestion = "";
    }
  });
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
