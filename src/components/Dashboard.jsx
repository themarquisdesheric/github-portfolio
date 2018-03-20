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
          fetch(`https://api.github.com/repos/themarquisdesheric/${repo.name}/git/trees/master?recursive=1`
            , { headers }
          )
            .then(res => res.json())
            .then(res => {
              const isNodeApp = res.tree.find(item => item.path.includes('package.json'));

              if (isNodeApp) repo.node = true;

              return repo;
            }));
        
        Promise.all(promises)
          .then(projects => {
            const nodeApps = projects.reduce( (count, project) => 
              project.node ? count + 1 : count
              , 0);

            this.setState({ nodeApps });
          });
      });
  }

  render() {
    const { nodeApps } = this.state;

    return (
      <article id="dashboard">
        <PieChart percentages={this.props.percentages} />
        {nodeApps && <StatsPanel nodeApps={nodeApps} />}
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
