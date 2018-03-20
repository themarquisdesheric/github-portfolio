import React from 'react';
import PropTypes from 'prop-types';

const StatsPanel = ({ nodeApps }) => (
  <div id="stats-panel">
    {nodeApps} Node apps
  </div>
);

StatsPanel.propTypes = {
  nodeApps: PropTypes.number.isRequired
};

export default StatsPanel;
