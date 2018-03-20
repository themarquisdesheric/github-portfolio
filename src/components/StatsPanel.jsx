import React from 'react';
import PropTypes from 'prop-types';

const StatsPanel = ({ mongoApps, nodeApps, expressApps, reactApps }) => (
  <div id="stats-panel">
    {mongoApps} MongoDB apps {nodeApps} Node apps {expressApps} Express apps {reactApps} React apps
  </div>
);

StatsPanel.propTypes = {
  mongoApps: PropTypes.number.isRequired,
  nodeApps: PropTypes.number.isRequired,
  expressApps: PropTypes.number.isRequired,
  reactApps: PropTypes.number.isRequired
};

export default StatsPanel;
