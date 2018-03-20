import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GitHub from 'github-api';
import fetch from 'isomorphic-fetch';
import PieChart from './PieChart';
import StatsPanel from './StatsPanel';

class Dashboard extends Component {
  state = {
    nodeApps: 0
  }

  componentDidMount() {
    const gh = new GitHub({ token: process.env.REACT_APP_GITHUB_KEY });
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
            , { headers }
          )
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
                    const packageJSON = window.atob(data.content);
                    const packageStringified = JSON.stringify(packageJSON);

                    if (packageStringified.includes('mongo')) repo.mongo = true;
                    if (packageStringified.includes('express')) repo.express = true;
                    if (packageStringified.includes('react')) repo.react = true;

                    return repo;
                  });
              } 
              else return repo;
            }));
        
        Promise.all(promises)
          .then(projects => {
            const nodeApps = projects.reduce( (count, project) => 
              project.node ? count + 1 : count
              , 0);
            const mongoApps = projects.reduce( (count, project) => 
              project.mongo ? count + 1 : count
              , 0);
            const expressApps = projects.reduce( (count, project) => 
              project.express ? count + 1 : count
              , 0);
            const reactApps = projects.reduce( (count, project) => 
              project.react ? count + 1 : count
              , 0);

            this.setState({ nodeApps, mongoApps, expressApps, reactApps });
          });
      });
  }

  render() {
    const { nodeApps, mongoApps, expressApps, reactApps } = this.state;

    return (
      <article id="dashboard">
        <PieChart percentages={this.props.percentages} />
        {nodeApps && 
          <StatsPanel 
            nodeApps={nodeApps} 
            mongoApps={mongoApps}
            expressApps={expressApps}
            reactApps={reactApps}
          />}
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
