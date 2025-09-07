// Animasi muncul saat scroll
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.news-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target); // biar cuma muncul sekali
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});
