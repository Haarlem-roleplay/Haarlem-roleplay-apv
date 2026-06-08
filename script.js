const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const printBtn = document.getElementById('printBtn');
const searchInput = document.getElementById('searchInput');
const navAnchors = [...document.querySelectorAll('.nav-links a, .sidebar-nav a')];
const sections = [...document.querySelectorAll('main section[id], .rules-section[id], .panel[id]')];
const searchableGroups = [...document.querySelectorAll('.rules-section, .panel')];
const searchableCards = [...document.querySelectorAll('.rule-card')];

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

navAnchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    navLinks?.classList.remove('open');
  });
});

if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    searchableCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const match = text.includes(query);
      card.classList.toggle('hidden', query !== '' && !match);
      card.classList.toggle('marked', query !== '' && match);
    });

    searchableGroups.forEach(group => {
      const visibleCards = group.querySelectorAll('.rule-card:not(.hidden)').length;
      const groupText = group.innerText.toLowerCase();
      const isRulesSection = group.classList.contains('rules-section');
      const directMatch = groupText.includes(query);

      if (!query) {
        group.classList.remove('hidden');
      } else if (isRulesSection) {
        group.classList.toggle('hidden', visibleCards === 0 && !directMatch);
      } else {
        // panels like intro/contact/straffen stay visible if directly matched
        group.classList.toggle('hidden', !directMatch && group.querySelectorAll('.rule-card').length === 0);
      }
    });
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${id}`);
    });
  });
}, {
  rootMargin: '-30% 0px -55% 0px',
  threshold: 0.05,
});

sections.forEach(section => {
  if (section.id) observer.observe(section);
});
