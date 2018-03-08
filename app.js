const main = document.querySelector('main');
const repos = [];

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
  const footer = document.createElement('footer');
  const p = document.createElement('p');
  
  p.textContent = repo.name;
  
  // create content for animated rollover if content available
  if (repo.description) {
    const figcaption = document.createElement('figcaption');

    figcaption.textContent = repo.description;
    figure.appendChild(figcaption);  
  }
  
  footer.appendChild(p);
  footer.appendChild(makeTags(repo.description));
  card.appendChild(figure);
  card.appendChild(footer);
  main.appendChild(card);
}

function makeTags(description) {
  const tags = document.createElement('div');

  tags.classList.add('tags');
  
  description = description ? description.toLowerCase() : '';

  // use HSL for color incrementing? 

  if (description.includes('react')) tags.appendChild(makeTag('react'));
  if (description.includes('redux')) tags.appendChild(makeTag('redux'));
  if (description.includes('node')) tags.appendChild(makeTag('node'));
  if (description.includes('jQuery')) tags.appendChild(makeTag('jQuery'));
  if (description.includes('chart.js')) tags.appendChild(makeTag('chart.js'));
  if (description.includes('mongo')) tags.appendChild(makeTag('mongo'));
  if (description.includes('postgres')) tags.appendChild(makeTag('postgres'));
  if (description.includes('mongoose')) tags.appendChild(makeTag('mongoose'));
  if (description.includes('mocha')) tags.appendChild(makeTag('mocha'));
  if (description.includes('jest')) tags.appendChild(makeTag('jest'));
  if (description.includes('chai')) tags.appendChild(makeTag('chai'));
  if (description.includes('express')) tags.appendChild(makeTag('express'));
  if (description.includes('sass')) tags.appendChild(makeTag('sass'));
  if (description.includes('react-router')) tags.appendChild(makeTag('react-router'));
  if (description.includes('handlebars')) tags.appendChild(makeTag('handlebars'));

  return tags;
}

function makeTag(text) {
  const tag = document.createElement('span');
  
  tag.classList.add('tag');
  tag.textContent = text;

  return tag;
}

repos.forEach(makeCard);
