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
