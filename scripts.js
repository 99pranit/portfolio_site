// Show all projects on load
filterProjects('all');
function filterProjects(cat) {
  const cards = document.getElementsByClassName('project-card');
  for (let card of cards) {
    card.classList.remove('show');
    if (cat === 'all' || card.classList.contains(cat)) {
      card.classList.add('show');
    }
  }
}
// Optionally add active class to buttons...
