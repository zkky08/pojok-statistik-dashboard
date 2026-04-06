const API_URL = 'http://localhost:4000/api/auth';

const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const errorText = document.getElementById('errorText');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorText.style.display = "none";

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value // 🔥 PLAINTEXT
      })
    });

    const data = await res.json();

    if (!res.ok) {
      errorText.textContent = data.message;
      errorText.style.display = "block";
      return;
    }

    alert("Login berhasil");
    window.location.href = "dashboard.html";

  } catch (err) {
    errorText.textContent = "Server tidak dapat diakses";
    errorText.style.display = "block";
  }
});
