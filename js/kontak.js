// Form validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const message = document.getElementById("userMessage").value.trim();

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMessage = document.getElementById("successMessage");

  let valid = true;

  [nameError, emailError, messageError].forEach(el => {
    el.textContent = "";
    el.classList.add("hidden");
  });

  if (!name) {
    nameError.textContent = "Nama tidak boleh kosong.";
    nameError.classList.remove("hidden");
    valid = false;
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    emailError.textContent = "Masukkan email yang valid.";
    emailError.classList.remove("hidden");
    valid = false;
  }
  if (!message) {
    messageError.textContent = "Pesan tidak boleh kosong.";
    messageError.classList.remove("hidden");
    valid = false;
  }

  if (valid) {
    successMessage.textContent = "Pesan berhasil dikirim!";
    successMessage.classList.remove("hidden");
    this.reset();

    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
  }
});

// Google Maps API init
function initMap() {
  const binaBangsa = { lat: -6.1210418, lng: 106.1889862 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: binaBangsa,
  });

  const marker = new google.maps.Marker({
    position: binaBangsa,
    map: map,
    title: "Universitas Bina Bangsa",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "<b>Universitas Bina Bangsa</b><br>Serang, Banten",
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
}
