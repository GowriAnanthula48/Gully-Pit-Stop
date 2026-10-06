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
