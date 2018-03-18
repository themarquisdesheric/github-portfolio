import React, { Component } from 'react';
import GitHub from 'github-api';
import fetch from 'isomorphic-fetch';
import Header from './components/Header';
import PieChart from './components/PieChart';
import CardContainer from './components/CardContainer';
import { calcLangTotals, calcRepoTotal, calcLangPercentages } from './utilities';
import './App.css';

class App extends Component {
  state = {
    repos: []
  };

  componentDidMount() {
    const repos = JSON.parse(sessionStorage.getItem('repos'));
    const percentages = JSON.parse(sessionStorage.getItem('percentages'));

    if (repos) this.setState({ repos, percentages });
    
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
                  calcLangTotals(repoStats, totals);
                  
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
                // break language totals into percentages for pie chart
                const percentages = calcLangPercentages(totals);

                // save to session storage so page reloads don't affect rate limit
                sessionStorage.setItem('repos', JSON.stringify(repos));
                sessionStorage.setItem('percentages', JSON.stringify(percentages));
      
                this.setState({ 
                  repos,
                  percentages
                });
              });
          });
        });
    }
  }

  render() {
    const { percentages, repos } = this.state;

    return (
      <div id="wrapper">
        <Header />
        {percentages && <PieChart percentages={percentages} />}
        <CardContainer repos={repos} />
      </div>
    );
  }
}

export default App;
