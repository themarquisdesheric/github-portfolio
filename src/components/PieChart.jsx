import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import pieceLabel from 'chart.piecelabel.js';

class PieChart extends Component {
  componentDidMount() {
    const labels = [];
    const data = []; 
    
    Object.entries(this.props.percentages)
      .forEach(([key, val]) => {
        labels.push(key);
        data.push(val);
      });

    Chart.defaults.global.defaultFontFamily = 'Oswald';
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultFontSize = 14;

    const options = {
      plugins: [
        pieceLabel
      ],
      pieceLabel: {
        render: ({ label, value }) => 
          `${value}% ${label}`,
        fontStyle: 'bold'
      },
      animation: {
        animateRotate: true,
        animateScale: true
      },
      title: {
        display: true,
        position: 'bottom',
        text: 'Information obtained via the GitHub API',
      },
      tooltips: false,
      rotation: Math.PI * 2.41,
      cutoutPercentage: 50
    };

    const chart = new Chart(this.canvas, {
      type: 'pie',
      options,
      data: {
        labels,
        datasets: [{
          backgroundColor: ['rgba(156, 39, 176, 0.6)', 'rgba(233, 30, 99, 0.6)', 'rgba(33, 150, 243, 0.6)'],
          data
        }]
      }
    });

    this.chart = chart;
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render () {
    return (
      <div id="chart">
        <canvas ref={canvas => this.canvas = canvas} height="400px" width="400px" />        
      </div>
    );
  }
}

PieChart.propTypes = {
  percentages: PropTypes.shape({
    HTML: PropTypes.number,
    CSS: PropTypes.number,
    JavaScript: PropTypes.number
  }).isRequired
};

export default PieChart;
