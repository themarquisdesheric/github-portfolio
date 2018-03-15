import React from 'react';
import GitHub from 'github-api';
import Card from './Card';

class CardContainer extends React.Component {
  state = {
    repos: []
  };

  componentDidMount() {
    const store = JSON.parse(localStorage.getItem('repos'));

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
          localStorage.setItem('repos', JSON.stringify(repos));

          this.setState({ repos });
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
