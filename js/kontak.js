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

// Form handling & validasi field
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const errorName = document.getElementById("errorName");
  const errorEmail = document.getElementById("errorEmail");
  const errorMessage = document.getElementById("errorMessage");
  const formMessage = document.getElementById("formMessage");

  // Reset error messages
  errorName.textContent = "";
  errorEmail.textContent = "";
  errorMessage.textContent = "";
  formMessage.textContent = "";

  let isValid = true;
  const emailPattern = /^\S+@\S+\.\S+$/;

  if(!name) {
    errorName.textContent = "Nama wajib diisi.";
    isValid = false;
  }
  if(!email || !emailPattern.test(email)) {
    errorEmail.textContent = "Email wajib diisi dengan format benar.";
    isValid = false;
  }
  if(!message) {
    errorMessage.textContent = "Pesan wajib diisi.";
    isValid = false;
  }

  if(!isValid) return;

  // Draft WhatsApp
  const waNumber = "6287741111144"; // ganti nomor Pa Ibenk
  const text = `Halo Bapak/Ibu,%0A%0ANama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APesan: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");

  formMessage.textContent = "Draft pesan terbuka di WhatsApp. Silakan klik kirim.";
  formMessage.style.color = "green";

  this.reset();
});
