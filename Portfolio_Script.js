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
      const supportsNative = 'scrollBehavior' in document.documentElement.style &&
                             !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
