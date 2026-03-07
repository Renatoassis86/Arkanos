// Suaviza o vídeo (playback mais lento)
(function(){
  const v = document.getElementById('bgVideo');
  if(!v) return;
  try { v.playbackRate = 0.7; } catch(e){}

  // Tilt simples nos painéis (sem lib externa)
  const tiltEls = document.querySelectorAll('.hover-tilt');
  tiltEls.forEach(el=>{
    const r = 8; // graus
    const onMove = (e)=>{
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      el.style.transform = `rotateX(${(-y*r).toFixed(2)}deg) rotateY(${(x*r).toFixed(2)}deg) translateY(-4px)`;
    };
    const reset = ()=> el.style.transform = '';
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  });

  // Menu mobile
  const burger = document.querySelector('.ark-burger');
  const nav = document.querySelector('.ark-nav');
  if(burger && nav){
    burger.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      burger.classList.toggle('open');
    });
  }
})();
