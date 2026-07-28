// ===== TYPING ANIMATION =====
const text = [
  "I am an astronomer",
  "I am a physicist",
  "I am a mathematician",
  "I am a data scientist",
  "Of course, I am a student"
];
let i = 0, j = 0, isDeleting = false;

function type() {
  const el = document.getElementById("typing");
  if (!el) return;
  const current = text[i];
  if (!isDeleting) {
    el.textContent = current.substring(0, j++);
    if (j > current.length) { isDeleting = true; setTimeout(type, 1200); return; }
  } else {
    el.textContent = current.substring(0, j--);
    if (j < 0) { isDeleting = false; i = (i + 1) % text.length; setTimeout(type, 400); return; }
  }
  setTimeout(type, isDeleting ? 50 : 80);
}
type();

// ===== STARFIELD =====
(function () {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const a = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,210,255,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  window.addEventListener('resize', () => { resize(); initStars(); });
  requestAnimationFrame(draw);
})();

// ===== CURSOR GLOW =====
const glow = document.getElementById('cursorGlow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId.length === 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});

// ===== HAMBURGER =====
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('open');
  });
}

// ===== SCROLL TO SECTION =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
}
