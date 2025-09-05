// Data materi sesuai id
const data = {
  kemiskinan: "/assets/infografis/Infografis pojok_Kemiskinan@4x.png",
  naker: "/assets/infografis/Infografis Naker@4x.png",
  ekspor: "/assets/infografis/Ekspor2@3x-100.jpg",
  iklim: "/assets/infografis/KamisInfografis@4x.png"
};

// Ambil ID dari query string (contoh: confirm.html?id=kemiskinan)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Ambil elemen
const form = document.getElementById("confirmForm");
const backBtn = document.getElementById("backBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailInput").value;
  if (!email) {
    alert("Silakan masukkan alamat email.");
    return;
  }

  const fileUrl = data[id];
  if (!fileUrl) {
    alert("File tidak ditemukan!");
    return;
  }

  // Pesan konfirmasi
  alert(`Terima kasih, materi akan dibuka & diunduh untuk: ${email}`);

  // Buka file di tab baru
  window.open(fileUrl, "_blank");

  // Auto-download
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileUrl.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Tombol kembali → langsung balik ke detail infografis
if (id) {
  backBtn.href = `infografis.html?id=${id}`;
}
