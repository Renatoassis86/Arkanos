// Abre/fecha menu mobile
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-toggle="menu"]');
  if (btn) {
    const drawer = document.getElementById('mobileMenu');
    drawer.classList.toggle('hidden');
  }
});
