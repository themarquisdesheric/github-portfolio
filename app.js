const repos = [];

fetch('https://api.github.com/users/themarquisdesheric/repos')
  .then(res => res.json())
  .then(githubRepos => repos.push(...githubRepos));
