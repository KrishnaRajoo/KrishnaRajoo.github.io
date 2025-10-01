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
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const logo = splash.querySelector('.splash-logo');

  // small timeout to ensure element is rendered, then trigger animation
  setTimeout(() => {
    logo.classList.add('animate'); // runs the 2s entry animation
  }, 100);

  // after entry animation (1s) + a short visible pause (700ms) => fade out
  const TOTAL_VISIBLE_MS = 1000 + 1500; // 1s animation + 1.5s pause
  setTimeout(() => {
    splash.classList.add('fade-out'); // starts 0.8s fade
  }, TOTAL_VISIBLE_MS);

  // remove from DOM after fade completes (0.8s), to avoid overlay blocking interactions
  splash.addEventListener('transitionend', (ev) => {
    if (ev.propertyName === 'opacity' && splash.classList.contains('fade-out')) {
      splash.style.display = 'none';
      splash.remove(); // optional: remove node
    }
  });
});