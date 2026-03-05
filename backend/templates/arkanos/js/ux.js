{% block extra_js %}
<script src="{% static 'arkanos/js/ux.js' %}"></script>
{% endblock %}
// static/arkanos/js/ux.js

// 1) Suaviza o :hover em touch (evita ficar “preso”)
document.addEventListener('touchstart', ()=>{}, {passive:true});

// 2) Anima entrada dos cards quando aparecem na viewport
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.transform = 'translateY(0)';
      e.target.style.opacity = '1';
      io.unobserve(e.target);
    }
  })
},{threshold:.12});

document.querySelectorAll('.card').forEach(el=>{
  el.style.transform='translateY(12px)';
  el.style.opacity='.0';
  el.style.transition='opacity .6s var(--fx-slow), transform .6s var(--fx-slow)';
  io.observe(el);
});

// 3) Respeita preferência de reduzir movimento
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.hero-video').forEach(v=>{
    v.removeAttribute('autoplay'); v.pause(); v.style.display='none';
  });
}
