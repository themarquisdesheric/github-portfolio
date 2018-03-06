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
  const fig = document.createElement('figure');
  const figCaption = document.createElement('figcaption');
  const img = document.createElement('img');

  img.src = 'github.png';
  figCaption.textContent = repo.name;

  fig.appendChild(img);
  fig.appendChild(figCaption);
  card.appendChild(fig);
  main.appendChild(card);
}

repos.forEach(makeCard);
