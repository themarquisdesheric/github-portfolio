import React from 'react';
import PropTypes from 'prop-types';

const StatsPanel = ({ mongo, node, express, react }) => (
  <div id="stats-panel">
    {mongo} MongoDB apps {node} Node apps {express} Express apps {react} React apps
  </div>
);

StatsPanel.propTypes = {
  mongo: PropTypes.number.isRequired,
  node: PropTypes.number.isRequired,
  express: PropTypes.number.isRequired,
  react: PropTypes.number.isRequired
};

export default StatsPanel;
