import React from 'react';
import GitHub from 'github-api';
import fetch from 'isomorphic-fetch';
import Card from './Card';
import { calcLanguageTotals, calcRepoTotal } from '../utilities';

class CardContainer extends React.Component {
  state = {
    repos: []
  };

  componentDidMount() {
    const store = JSON.parse(sessionStorage.getItem('repos'));

    if (store) this.setState({ repos: store });
    
    else {
      const gh = new GitHub({
        token: process.env.REACT_APP_GITHUB_KEY
      });

      gh.getUser()
        .listRepos()
        .then(repos => repos.data.filter(repo => 
          repo.owner.login === 'themarquisdesheric' && 
          repo.name !== 'incubator-datafu'))
        .then(repos => {

          // display repos, then calculate language totals
          this.setState({ repos }, () => {
            const headers = new Headers({
              Authorization: `token ${process.env.REACT_APP_GITHUB_KEY}`,
            });
            const totals = {
              total: 0
            };
  
            // get language statistics for each repo
            const promises = repos.map(repo => 
              fetch(repo.languages_url, { headers })
                .then(res => res.json())
                .then(repoStats => {
                  calcLanguageTotals(repoStats, totals);
                  
                  const repoTotal = calcRepoTotal(repoStats);
  
                  totals.total += repoTotal;
  
                  // add language stats and total to repo
                  repoStats.total = repoTotal;
                  repo.languages = repoStats;
  
                  return repo;
                })
            );
            
            Promise.all(promises)
              .then(repos => {
                // save to session storage so page reloads don't affect rate limit
                sessionStorage.setItem('repos', JSON.stringify(repos));
      
                this.setState({ repos, totals });
              });
          });
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
