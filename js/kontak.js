// Inisialisasi peta
function initMap() {
  const unibaCoords = [-6.1436, 106.1639];

  // Buat map
  const map = L.map("map").setView(unibaCoords, 16);

  // Layer OSM
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  // Marker dengan popup + link ke Google Maps
  const popupContent = `
    <b>Universitas Bina Bangsa</b><br>
    Serang, Banten<br>
    <a href="https://www.google.com/maps?q=-6.1436,106.1639" target="_blank" class="text-blue-600 underline">
      Buka di Google Maps
    </a>
  `;

  L.marker(unibaCoords).addTo(map).bindPopup(popupContent).openPopup();
}

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", initMap);

// Form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("formMessage").textContent =
    "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.";
  this.reset();
});
