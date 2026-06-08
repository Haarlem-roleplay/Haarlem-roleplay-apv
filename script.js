const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.top-nav');
toggle?.addEventListener('click', () => nav.classList.toggle('open'));

const search = document.getElementById('searchInput');
const blocks = [...document.querySelectorAll('.rule-block')];
search?.addEventListener('input', () => {
  const q = search.value.toLowerCase().trim();
  blocks.forEach(block => {
    const match = block.textContent.toLowerCase().includes(q);
    block.classList.toggle('hidden', q && !match);
  });
});

document.getElementById('printBtn')?.addEventListener('click', () => window.print());
