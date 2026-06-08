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

// ── SCROLL REVEAL ───────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger each card slightly
      const delay = (i % 3) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
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
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ── FALLING PETALS ──────────────────────────────────────────
function createPetal() {
  const container = document.getElementById('petals');
  const petal = document.createElement('div');
  petal.className = 'petal';

  // Random petal SVG shapes (simplified flower / leaf shapes)
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

// Spawn petals periodically (subtle, not overwhelming)
setInterval(createPetal, 1400);
// Spawn a few on load
for (let i = 0; i < 5; i++) {
  setTimeout(createPetal, i * 600);
}
