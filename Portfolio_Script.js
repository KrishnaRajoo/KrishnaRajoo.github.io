
// Smooth scrolling with sticky-header offset + fallback
(function () {
  const header = document.querySelector('header');
  const headerOffset = (header?.offsetHeight || 0) + 10;

  function animateScroll(toY, duration = 500) {
    const startY = window.pageYOffset;
    const diff = toY - startY;
    let start;

    function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const pct = Math.min(time / duration, 1);
      // easeInOutQuad
      const eased = pct < 0.5 ? 2 * pct * pct : -1 + (4 - 2 * pct) * pct;
      window.scrollTo(0, startY + diff * eased);
      if (time < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      // If browser supports smooth behavior, let it handle it
      const supportsNative = 'scrollBehavior' in document.documentElement.style &&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      if (supportsNative) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // offset correction after native scroll
        setTimeout(() => window.scrollTo({ top: targetY }), 0);
      } else {
        animateScroll(targetY, 550);
      }
    });
  });
})();

// Splash control: play 1s entry animation, then fade out
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const logo = splash.querySelector('.splash-logo');

  // trigger entry animation after small delay
  setTimeout(() => {
    logo.classList.add('animate');
  }, 100);

  // after entry animation (1s) + 2s pause => fade out
  const TOTAL_VISIBLE_MS = 1000 + 2000; // 1s animation + 2s pause
  setTimeout(() => {
    splash.classList.add('fade-out');
  }, TOTAL_VISIBLE_MS);

  splash.addEventListener('transitionend', (ev) => {
    if (ev.propertyName === 'opacity' && splash.classList.contains('fade-out')) {
      splash.style.display = 'none';
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');

  if (!toggle || !nav) return;

  // Toggle menu on button click
  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent immediate close
    nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', nav.classList.contains('show'));
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ✅ Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('show') &&
      !nav.contains(e.target) &&
      e.target !== toggle
    ) {
      nav.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});