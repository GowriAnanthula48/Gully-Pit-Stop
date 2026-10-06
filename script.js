const filters = document.querySelectorAll('[data-filter]');
const items = document.querySelectorAll('[data-category]');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    items.forEach(item => {
      item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter;
    });
  });
});

const welcome = document.querySelector('.welcome-dialog');
if (welcome && typeof welcome.showModal === 'function') {
  const closeWelcome = () => welcome.close();
  welcome.querySelector('.welcome-close').addEventListener('click', closeWelcome);
  welcome.querySelector('.welcome-explore').addEventListener('click', () => {
    closeWelcome();
    document.querySelector('#menu').scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
    const firstFilter = document.querySelector('[data-filter="all"]');
    firstFilter.focus({ preventScroll: true });
  });
  welcome.addEventListener('click', event => {
    const bounds = welcome.getBoundingClientRect();
    if (event.target === welcome && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeWelcome();
  });
  welcome.addEventListener('close', () => document.body.classList.remove('welcome-open'));
  welcome.showModal();
  document.body.classList.add('welcome-open');
}

const motionToggle = document.querySelector('.motion-toggle');
if (motionToggle) {
  motionToggle.addEventListener('click', () => {
    const paused = document.body.classList.toggle('motion-paused');
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Play motion' : 'Pause motion';
  });
}
