// ── COUNTDOWN ──────────────────────────────────────────────
const target = new Date('2026-08-01T21:00:00');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  let diff = target - new Date();
  if (diff < 0) diff = 0;
  document.getElementById('days').textContent    = Math.floor(diff / 86400000);
  document.getElementById('hours').textContent   = pad(Math.floor(diff % 86400000 / 3600000));
  document.getElementById('minutes').textContent = pad(Math.floor(diff % 3600000 / 60000));
  document.getElementById('seconds').textContent = pad(Math.floor(diff % 60000 / 1000));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── MUSIC ───────────────────────────────────────────────────
const audio     = document.getElementById('bgAudio');
const btn       = document.getElementById('musicBtn');
const iconPlay  = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const tooltip   = btn.querySelector('.music-tooltip');
let started     = false;

function setPlaying(playing) {
  iconPlay.style.display  = playing ? 'none'  : 'block';
  iconPause.style.display = playing ? 'block' : 'none';
}

btn.addEventListener('click', () => {
  tooltip.classList.add('hidden');

  if (!started) {
    audio.volume = 0;
    audio.play().then(() => {
      started = true;
      setPlaying(true);
      let v = 0;
      const fade = setInterval(() => {
        v = Math.min(v + 0.04, 0.75);
        audio.volume = v;
        if (v >= 0.75) clearInterval(fade);
      }, 80);
    });
    return;
  }

  if (audio.paused) {
    audio.play();
    setPlaying(true);
  } else {
    audio.pause();
    setPlaying(false);
  }
});

// ── PAUSE ON BLUR ───────────────────────────────────────────
document.addEventListener('visibilitychange', () => {
  if (document.hidden && !audio.paused) {
    audio.pause();
    setPlaying(false);
  }
});

// ── SCROLL HINT ─────────────────────────────────────────────
const scrollHint = document.getElementById('scrollHint');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) scrollHint.classList.add('hidden');
}, { passive: true });

// ── SCROLL REVEAL ───────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = (i % 3) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// ── SCROLL PROGRESS BAR ─────────────────────────────────────
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
}, { passive: true });

// ── FALLING PETALS (dorados — toda la página) ───────────────
function createPetal() {
  const container = document.getElementById('petals');
  const petal = document.createElement('div');
  petal.className = 'petal';
  const shapes = [
    `<svg width="12" height="16" viewBox="0 0 12 16" fill="none"><ellipse cx="6" cy="8" rx="5" ry="7" fill="#C4A882" opacity="0.5" transform="rotate(-20 6 8)"/></svg>`,
    `<svg width="10" height="14" viewBox="0 0 10 14" fill="none"><ellipse cx="5" cy="7" rx="4" ry="6" fill="#B8965A" opacity="0.4" transform="rotate(15 5 7)"/></svg>`,
    `<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="3.5" fill="#D4AF7A" opacity="0.35"/></svg>`,
    `<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><ellipse cx="7" cy="5" rx="6" ry="4" fill="#C4A882" opacity="0.4" transform="rotate(-10 7 5)"/></svg>`,
  ];
  petal.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (6 + Math.random() * 8) + 's';
  petal.style.animationDelay = Math.random() * 5 + 's';
  container.appendChild(petal);
  petal.addEventListener('animationend', () => petal.remove());
}
setInterval(createPetal, 1400);
for (let i = 0; i < 5; i++) setTimeout(createPetal, i * 600);

// ── HERO WHITE PETALS (solo en el hero) ─────────────────────
function createHeroPetal() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Solo crear si el hero es visible en pantalla
  const heroBottom = hero.getBoundingClientRect().bottom;
  if (heroBottom < 0) return;

  const petal = document.createElement('div');
  petal.className = 'petal-hero';
  const shapes = [
    `<svg width="14" height="18" viewBox="0 0 14 18" fill="none"><ellipse cx="7" cy="9" rx="6" ry="8" fill="white" opacity="0.55" transform="rotate(-20 7 9)"/></svg>`,
    `<svg width="10" height="14" viewBox="0 0 10 14" fill="none"><ellipse cx="5" cy="7" rx="4" ry="6" fill="white" opacity="0.45" transform="rotate(25 5 7)"/></svg>`,
    `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><ellipse cx="6" cy="6" rx="5" ry="4" fill="white" opacity="0.4" transform="rotate(-10 6 6)"/></svg>`,
    `<svg width="8" height="12" viewBox="0 0 8 12" fill="none"><ellipse cx="4" cy="6" rx="3" ry="5" fill="white" opacity="0.5" transform="rotate(10 4 6)"/></svg>`,
    `<svg width="16" height="10" viewBox="0 0 16 10" fill="none"><ellipse cx="8" cy="5" rx="7" ry="4" fill="white" opacity="0.38" transform="rotate(-15 8 5)"/></svg>`,
  ];
  petal.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (5 + Math.random() * 7) + 's';
  petal.style.animationDelay = (Math.random() * 2) + 's';
  hero.appendChild(petal);
  petal.addEventListener('animationend', () => petal.remove());
}
setInterval(createHeroPetal, 1000);
for (let i = 0; i < 8; i++) setTimeout(createHeroPetal, i * 400);
