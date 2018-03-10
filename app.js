const main = document.querySelector('main');
const repos = [];

// save to local storage for development
const store = localStorage.getItem('repos');

if (store) {
  repos.push( ...JSON.parse(store) );
} else {
  fetch('https://api.github.com/users/themarquisdesheric/repos')
    .then(res => res.json())
    .then(githubRepos => {
      repos.push(...githubRepos)
      repos.forEach(makeCard);
    });
}

function getPercentages(obj) {
  const total = Object.keys(obj)
                  .reduce( (total, lang) => 
                    total + obj[lang], 
                  0);
  
  return Object.keys(obj)
          .reduce( (percentages, lang) => {
            percentages[lang] = Math.round(obj[lang] / total * 100);
            
            return percentages;
          }, {});
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
  const technologies = ['react', 'react-router', 'redux', 'node', 'jquery', 'chart.js', 'mongo', 'mongoose', 
    'postgres', 'mocha', 'chai', 'jest', 'express','bulma', 'sass', 'handlebars', 'heroku'];
  
  tags.classList.add('tags');
  
  if (description) {
    description = description.toLowerCase();

    technologies.forEach(tech => {
      if (description.includes(tech)) {
        const tag = makeTag(tech);

        tag.classList.add(tech);

        tags.appendChild(tag);
      }
    });  
  }

  return tags;
}

function makeTag(text) {
  const tag = document.createElement('span');
  
  tag.classList.add('tag');
  tag.textContent = text;

  return tag;
}

repos.forEach(repo => {
  fetch(repo.languages_url)
    .then(res => res.json())
    .then(languages => 
      repo.percentages = getPercentages(languages)
    )
    .catch(console.log);  
  });
  
localStorage.setItem('repos', JSON.stringify(repos));
