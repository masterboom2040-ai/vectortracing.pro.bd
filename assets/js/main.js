/* ══════════════════════════════════════════════════
   VECTORTRACING PRO — MAIN JS
════════════════════════════════════════════════════ */
'use strict';

// ─── YEAR ───────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── STICKY HEADER ──────────────────────────────────
const header = document.getElementById('site-header');
function handleScroll() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ─── MOBILE NAV ─────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// ─── SMOOTH ANCHOR SCROLLING ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const headerH = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── SCROLL REVEAL ───────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children of grids
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Add reveal class to elements
function initReveal() {
  const elements = document.querySelectorAll(
    '.service-card, .process-step, .portfolio-item, .testimonial-card, .faq-item, .section-header, .contact-inner'
  );
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger grid children
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('services-grid') ||
                   parent.classList.contains('portfolio-grid') ||
                   parent.classList.contains('testimonials-grid') ||
                   parent.classList.contains('process-steps') ||
                   parent.classList.contains('faq-grid'))) {
      const siblings = Array.from(parent.children);
      const idx = siblings.indexOf(el);
      el.dataset.delay = idx * 80;
    }
    revealObserver.observe(el);
  });
}

initReveal();

// ─── GLOSSY CARD TILT (desktop only) ─────────────────
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -8;
      const tiltY = x * 8;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── ACTIVE NAV LINK ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// ─── PERFORMANCE: lazy load SVG patterns ─────────────
// Service card glow on scroll
const glowObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.willChange = 'transform';
      } else {
        entry.target.style.willChange = 'auto';
      }
    });
  },
  { threshold: 0 }
);

document.querySelectorAll('.service-card').forEach(card => glowObserver.observe(card));

// ─── WhatsApp Float Button ────────────────────────────
// Inject a floating WhatsApp button after 3s
setTimeout(() => {
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/8801771522503?text=Hi%20Hamida!%20I%20need%20vector%20tracing%20services.';
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.className = 'wa-float';
  wa.innerHTML = `<svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;

  const style = document.createElement('style');
  style.textContent = `
    .wa-float {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #25d366, #128c7e);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      z-index: 900;
      transition: transform 0.25s, box-shadow 0.25s;
      animation: wa-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .wa-float:hover {
      transform: scale(1.12);
      box-shadow: 0 8px 32px rgba(37, 211, 102, 0.6);
    }
    .wa-float::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(37,211,102,0.3);
      animation: wa-ring 2.5s ease-out infinite;
    }
    @keyframes wa-pop {
      from { transform: scale(0); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes wa-ring {
      0% { transform: scale(1); opacity: 0.7; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    .nav-links a.active { color: var(--gold-300); }
  `;
  document.head.appendChild(style);
  document.body.appendChild(wa);
}, 3000);

console.log('%c VectorTracing Pro ', 'background:#c9a84c;color:#0a0808;font-size:14px;font-weight:bold;padding:4px 8px;border-radius:4px;');
