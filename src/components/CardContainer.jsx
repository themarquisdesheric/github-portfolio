import React from 'react';
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
      fetch('https://api.github.com/users/themarquisdesheric/repos?per_page=100')
        .then(res => res.json())
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
