(() => {
  const v = document.querySelector('.hero__video');
  if(!v) return;

  const tryPlay = () => v.play().catch(()=>{});
  const onResize = () => {
    const isMobile = matchMedia('(max-width: 768px)').matches;
    if (isMobile){
      v.pause();
      v.removeAttribute('autoplay');
    } else {
      v.setAttribute('autoplay', '');
      tryPlay();
    }
  };

  tryPlay();
  window.addEventListener('resize', onResize);
  onResize();
})();


// ===== Animação de entrada (on-scroll) – 5 passos =====
(function () {
  const els = document.querySelectorAll('#passos-ciclo .reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// ===== Força vídeos a iniciarem (após interação/visível) em alguns browsers móveis =====
(function () {
  const vids = document.querySelectorAll('#passos-ciclo video');
  function safePlay(v) { v.play().catch(() => {}); }
  vids.forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.addEventListener('canplay', () => safePlay(v), { once: true });
  });
  window.addEventListener('touchstart', () => vids.forEach(safePlay), { once: true, passive: true });
})();


/* ====== On-Scroll: revela cards e controla play/pause ====== */
(function () {
  const els = document.querySelectorAll('#etapas .inview');
  const vids = document.querySelectorAll('#etapas video');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  els.forEach(el => io.observe(el));

  const vo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (v.paused) v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.35 });

  vids.forEach(v => vo.observe(v));
})();


/* ===== Passos: animação + play/pause dos vídeos ===== */
(function () {
  const steps = document.querySelectorAll('.section-steps .step');
  if (!steps.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const step = e.target;
      const video = step.querySelector('video');
      if (e.isIntersecting) {
        step.classList.add('in');
        if (video && video.paused) {
          // iOS/Android exigem muted + playsinline (já setados no HTML)
          video.play().catch(() => {});
        }
      } else {
        step.classList.remove('in');
        if (video && !video.paused) video.pause();
      }
    });
  }, { threshold: 0.35 });

  steps.forEach(s => io.observe(s));
})();


// Revela elementos .reveal quando entram na viewport
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();

// Guardiões: play/pause suave e inicialização segura em mobile
(() => {
  const vids = document.querySelectorAll('#guardioes .thumb-video');
  if (!vids.length) return;

  vids.forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('playsinline','');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        v.play().catch(()=>{});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.35 });

  vids.forEach(v => io.observe(v));
  // 1º toque em iOS
  window.addEventListener('touchstart', () => vids.forEach(v => v.play().catch(()=>{})), { once:true, passive:true });
})();
