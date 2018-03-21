import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GitHub from 'github-api';
import fetch from 'isomorphic-fetch';
import PieChart from './PieChart';
import StatsPanel from './StatsPanel';

class Dashboard extends Component {
  state = {
    mongo: 0,
    node: 0,
    express: 0,
    react: 0
  }

  componentDidMount() {
    const gh = new GitHub({ 
      token: process.env.REACT_APP_GITHUB_KEY 
    });
    const headers = new Headers({
      Authorization: `token ${process.env.REACT_APP_GITHUB_KEY}`,
    });

    gh.getUser()
      .listRepos()
      .then(repos => repos.data.filter(repo => 
        repo.owner.login === 'themarquisdesheric' && 
        repo.name !== 'incubator-datafu'))
      .then(repos => {
        const promises = repos.map(repo =>
          // fetch content tree for each repo
          fetch(`https://api.github.com/repos/themarquisdesheric/${repo.name}/git/trees/master?recursive=1`
            , { headers })
            .then(res => res.json())
            .then(res => {
              const packageJSONIndex = res.tree.findIndex(item => item.path.includes('package.json'));

              if (packageJSONIndex > -1) {
                repo.node = true;
                // fetch package.json
                return fetch(res.tree[packageJSONIndex].url, { headers })
                  .then(res => res.json())
                  .then(data => {
                    // convert from base64 encoding
                    const packageJSON = JSON.stringify(window.atob(data.content));

                    if (packageJSON.includes('mongo')) repo.mongo = true;
                    if (packageJSON.includes('express')) repo.express = true;
                    if (packageJSON.includes('react')) repo.react = true;

                    return repo;
                  });
              } 
              else return repo;
            }));
        
        Promise.all(promises)
          .then(projects => {
            const stats = projects.reduce( (totals, project) => {
              if (project.mongo) totals.mongo++;
              if (project.node) totals.node++;
              if (project.express) totals.express++;
              if (project.react) totals.react++;
              
              return totals;
            }, { ...this.state });

            this.setState({ ...stats });
          });
      });
  }

  render() {
    const { mongo, node, express, react } = this.state;

    return (
      <article id="dashboard">
        <PieChart percentages={this.props.percentages} />
        <StatsPanel 
          mongo={mongo}
          node={node} 
          express={express}
          react={react}
        />
      </article>
    );
  }
}

Dashboard.propTypes = {
  percentages: PropTypes.shape({
    HTML: PropTypes.number,
    CSS: PropTypes.number,
    JavaScript: PropTypes.number
  }).isRequired
};

export default Dashboard;
