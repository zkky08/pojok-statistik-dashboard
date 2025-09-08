// kontak.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("userEmail");
  const questionInput = document.getElementById("userQuestion");
  const emailError = document.getElementById("emailError");
  const questionError = document.getElementById("questionError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset pesan error
    emailError.textContent = "";
    questionError.textContent = "";
    emailError.classList.add("hidden");
    questionError.classList.add("hidden");

    // Validasi email
    if (!emailInput.value || !emailInput.value.includes("@")) {
      emailError.textContent = "Masukkan email yang valid.";
      emailError.classList.remove("hidden");
      isValid = false;
    }

    // Validasi pertanyaan
    if (!questionInput.value.trim()) {
      questionError.textContent = "Pertanyaan tidak boleh kosong.";
      questionError.classList.remove("hidden");
      isValid = false;
    }

    if (isValid) {
      // Tampilkan pesan sukses
      const successMessage = document.createElement("div");
      successMessage.classList.add("success-message");
      successMessage.textContent = "Pesan Anda berhasil dikirim!";
      
      form.prepend(successMessage);

      // Reset form
      form.reset();

      // Hapus pesan sukses otomatis setelah 5 detik
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
});
