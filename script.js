
   // ========== Simple JS for preloader, theme, smooth scroll, form ===========
(function(){
  const pre = document.getElementById('preloader');
  // simulate loading (but quick); remove preloader after assets load or 900ms min
  const removePreloader = ()=>{
    pre.style.transition = 'opacity .6s ease';
    pre.style.opacity = 0;
    setTimeout(()=>pre.remove(),700);
  }
  // wait for full load or 900ms whichever is longer
  const start = Date.now();
  window.addEventListener('load', ()=>{
    const remain = 900 - (Date.now()-start);
    setTimeout(removePreloader, Math.max(0, remain));
  });
  // fallback remove after 2500ms
  setTimeout(()=>{ if(document.body.contains(pre)) removePreloader()},2500);

  // theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(t){
    if(t === 'light'){
      root.setAttribute('data-theme','light');
      themeToggle.textContent = 'Light';
    } else {
      root.removeAttribute('data-theme');
      themeToggle.textContent = 'Dark';
    }
  }
  // initial if user prefers light
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');

  themeToggle.addEventListener('click', ()=>{
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });

  // smooth scroll helper
  window.scrollToID = function(id){
    const el = document.getElementById(id);
    if(!el) return; el.scrollIntoView({behavior:'smooth',block:'start'});
  }

  // simple form handler (mock)
  window.submitForm = function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const note = document.getElementById('formNote');
    note.textContent = 'Sending...';
    // mimic network
    setTimeout(()=>{
      note.textContent = `Thanks ${name}! I'll review and reply to ${email} shortly.`;
      e.target.reset();
    },900);
  }

  window.copyContact = function(){
    navigator.clipboard && navigator.clipboard.writeText('hello@phoenixxweb3.test').then(()=>{
      alert('Email copied to clipboard');
    }).catch(()=>{ alert('Copy failed — hello@phoenixxweb3.test'); });
  }

  // small entrance on scroll for elements with .fade-in
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.style.opacity = 1; en.target.style.transform = 'none'; }});
  },{threshold:0.12});
  document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

  // ========== Mobile menu toggle ==========
  // Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });
}


})(); 



