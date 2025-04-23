// ==================================
// 1. SLIDER
// ==================================
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides[currentIndex].classList.remove('active');
  currentIndex = (index + slides.length) % slides.length;
  slides[currentIndex].classList.add('active');
  updateDots();
}

function changeSlide(step) {
  showSlide(currentIndex + step);
}

function currentSlide(index) {
  showSlide(index - 1);
}

function updateDots() {
  let dots = document.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.style.background = (idx === currentIndex) ? '#A51C30' : 'white';
  });
}

// Slider automatique toutes les 5 secondes
setInterval(() => {
  changeSlide(1);
}, 5000);

updateDots();

// ==================================
// 2. INTERSECTION OBSERVER (Animations)
// ==================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

const animElements = document.querySelectorAll('.fade-in-left, .fade-in-right');
animElements.forEach(el => {
  observer.observe(el);
});

// ==================================
// 3. MENU BURGER : toggleMenu()
// ==================================
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('nav-active');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// ==================================
// 4. TYPING LETTER PAR LETTER AVEC ESPACES
// ==================================
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.text-overlay h2.typing');
  const text  = title.textContent;  // « Bienvenue à RPM25 »
  title.textContent = '';           // on vide le <h2>

  Array.from(text).forEach((char, i) => {
    const span = document.createElement('span');
    
    if (char === ' ') {
      // espaces insécables pour éviter qu'ils disparaissent
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = char;
    }

    // chaque lettre démarre un peu plus tard (i×0.1s)
    span.style.animation = `fadeInUp 0.5s ease forwards ${ (i * 0.1).toFixed(1) }s`;
    title.appendChild(span);
  });
});

// ── Bouton Téléchargement animé & ouverture auto ──
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const btn     = this;
    const fileUrl = btn.getAttribute('data-file') || btn.getAttribute('href');

    btn.classList.add('loading');
    btn.querySelector('.text').textContent = 'Téléchargement…';

    setTimeout(() => {
      btn.classList.remove('loading');
      btn.classList.add('done');

      // <-- CE CODE UTILISE data-done-text
      const doneText = btn.getAttribute('data-done-text') || btn.querySelector('.text').textContent;
      btn.querySelector('.text').textContent = doneText;

      window.open(fileUrl, '_blank');
    }, 500);
  });
}




// ==================================
// 5. COMPTE À REBOURS J‑jours avant le colloque
// ==================================
(function(){
  const deadline = new Date('2025-11-15T00:00:00').getTime();
  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minsEl    = document.getElementById('minutes');
  const secsEl    = document.getElementById('seconds');

  function updateCountdown() {
    const now   = Date.now();
    const diff  = Math.max(0, deadline - now);
    const d     = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h     = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m     = Math.floor((diff / (1000 * 60)) % 60);
    const s     = Math.floor((diff / 1000) % 60);

    daysEl.textContent    = d;
    hoursEl.textContent   = String(h).padStart(2, '0');
    minsEl.textContent    = String(m).padStart(2, '0');
    secsEl.textContent    = String(s).padStart(2, '0');
  }

  // Mise à jour immédiate + toutes les secondes
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
