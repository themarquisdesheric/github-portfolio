import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = 'Oswald';
Chart.defaults.global.defaultFontColor = '#000';
Chart.defaults.global.defaultFontSize = 14;

console.log(Chart.defaults.global); 

class PieChart extends Component {
  componentDidMount() {
    const labels = [];
    const data = []; 
    
    Object.entries(this.props.percentages)
      .forEach(([key, val]) => {
        labels.push(key);
        data.push(val);
      });

    const options = {
      animation: {
        animateRotate: true,
        animateScale: true
      },
      title: {
        display: true,
        position: 'bottom',
        text: 'Information obtained via the GitHub API',
      }
    };

    const chart = new Chart(this.canvas, {
      type: 'pie',
      options,
      data: {
        labels,
        datasets: [{
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 205, 86, 0.2)'],
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
