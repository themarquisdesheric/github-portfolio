const repos = [];
const main = document.querySelector('main');

// save to local storage for development
const store = localStorage.getItem('repos');

if (store) {
  repos.push( ...JSON.parse(store) );
} else {
  fetch('https://api.github.com/users/themarquisdesheric/repos')
    .then(res => res.json())
    .then(githubRepos => repos.push(...githubRepos))
    .then( () => 
      localStorage.setItem('repos', JSON.stringify(repos))
    );
}

function makeCard(repo) {
  const card = document.createElement('section');
  const figure = document.createElement('figure');
  const p = document.createElement('p');
  
  p.textContent = repo.name;

  if (repo.description) {
    // create content for animated rollover if content available
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = repo.description;
    figure.appendChild(figcaption);
  }

  card.appendChild(figure);
  card.appendChild(p);
  main.appendChild(card);
}

repos.forEach(makeCard);
