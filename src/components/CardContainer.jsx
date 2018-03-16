import React from 'react';
import GitHub from 'github-api';
import Card from './Card';
import fetch from 'isomorphic-fetch';

class CardContainer extends React.Component {
  state = {
    repos: []
  };

  componentDidMount() {
    const store = JSON.parse(sessionStorage.getItem('repos'));

    if (store) {
      this.setState({ repos: store });
    } else {
      const gh = new GitHub({
        token: process.env.REACT_APP_GITHUB_KEY
      });

      gh.getUser()
        .listRepos()
        .then(repos => repos.data.filter(repo => repo.owner.login === 'themarquisdesheric'))
        .then(repos => {
          const headers = new Headers({
            Authorization: `token ${process.env.REACT_APP_GITHUB_KEY}`,
          });

          // save to session storage in case of page reloads... don't want to tax the API
          sessionStorage.setItem('repos', JSON.stringify(repos));
          this.setState({ repos });

          const promises = repos.map(repo => 
            fetch(repo.languages_url, { headers })
              .then(res => res.json())
          );
          
          const resolvedPromises = Promise.all(promises);
        });
    }
  }

  render() {
    const { repos } = this.state;

    return (
      <main>
        {repos.map(repo =>  
          <Card key={repo.name} {...repo} />
        )}
      </main>
    );
  }
}

export default CardContainer;
