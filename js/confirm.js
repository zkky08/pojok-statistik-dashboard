// Data materi sesuai id
const data = {
  kemiskinan: "/assets/infografis/Infografis pojok_Kemiskinan@4x.png",
  naker: "/assets/infografis/Infografis Naker@4x.png",
  ekspor: "/assets/infografis/Ekspor2@3x-100.jpg",
  iklim: "/assets/infografis/KamisInfografis@4x.png"
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const backBtn = document.getElementById("backBtn");
if (id) backBtn.href = `infografis.html?id=${id}`;

const form = document.getElementById("confirmForm");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const countdownText = document.getElementById("countdownText");

// === Event Submit ===
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  if (!email) {
    showPopup("⚠️ Form Belum Lengkap", "Silakan masukkan alamat email Anda terlebih dahulu.");
    return;
  }

  if (!id || !data[id]) {
    showPopup("❌ File Tidak Ditemukan", "Maaf, file materi tidak tersedia. Silakan coba lagi.");
    return;
  }

  // --- Lanjut proses countdown & download ---
  progressContainer.classList.remove("hidden");
  progressBar.style.width = "0%";

  let countdown = 5;
  countdownText.textContent = `⏳ Download dimulai dalam ${countdown} detik...`;
  showToast(`⏳ Persiapan download...`);

  let progress = 0;
  const interval = setInterval(() => {
    countdown--;
    progress += 20;
    progressBar.style.width = `${progress}%`;

    if (countdown > 0) {
      countdownText.textContent = `⏳ Download dimulai dalam ${countdown} detik...`;
    } else {
      clearInterval(interval);
      countdownText.textContent = "✅ Download dimulai!";
      progressBar.style.width = "100%";

      // Buka file di tab baru
      window.open(data[id], "_blank");

      // Auto-download
      const a = document.createElement("a");
      a.href = data[id];
      a.download = data[id].split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Notifikasi selesai
      showToast("✅ Selesai mendownload! Terima kasih telah mendownload materi 🙏", 6000);

      // Redirect ke halaman deskripsi infografis
      setTimeout(() => {
        window.location.href = `infografis.html?id=${id}`;
      }, 4000);
    }
  }, 1000);
});

// === Toast ===
function showToast(message, duration = 5000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  toast.classList.remove("opacity-0", "translate-y-[-20px]");
  toast.classList.add("opacity-100", "translate-y-0");

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-[-20px]");
  }, duration);
}

// === Popup ===
function showPopup(title, message) {
  const overlay = document.getElementById("popup");
  const content = overlay.querySelector(".popup-content");
  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupMessage").textContent = message;

  document.body.style.overflow = "hidden";
  overlay.classList.remove("hidden");

  // restart animasi
  content.classList.remove("popup-content");
  void content.offsetWidth;
  content.classList.add("popup-content");
}

function closePopup() {
  const overlay = document.getElementById("popup");
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("popup").addEventListener("click", (e) => {
  if (e.target.id === "popup") closePopup();
});
document.getElementById("popupOkBtn").addEventListener("click", closePopup);
