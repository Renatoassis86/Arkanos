// Abre/fecha menu mobile
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-toggle="menu"]');
  if (btn) {
    const drawer = document.getElementById('mobileMenu');
    drawer.classList.toggle('hidden');
  }
});

// Toggle menu mobile
(function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('mobile-nav');
  if(!btn || !nav) return;

  const toggle = () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
  };
  btn.addEventListener('click', toggle);
})();
