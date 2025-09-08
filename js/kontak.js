// Inisialisasi Google Maps
function initMap() {
  const unibaCoords = { lat: -6.120574570319566, lng: 106.19099966972281 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: unibaCoords,
  });

  const marker = new google.maps.Marker({
    position: unibaCoords,
    map: map,
    title: "Universitas Bina Bangsa",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `<b>Universitas Bina Bangsa</b><br>Serang, Banten
              <br><a href="https://www.google.com/maps?q=-6.130356,106.178132" target="_blank">
              Buka di Google Maps</a>`
  });

  marker.addListener("click", () => infoWindow.open(map, marker));
  infoWindow.open(map, marker);
}

// Form handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("formMessage").textContent =
      "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.";
    this.reset();
  });
});
