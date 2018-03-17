import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

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
      title: {
        display: true,
        fontFamily: 'Oswald',
        fontSize: 14,
        fontColor: '#000'
      },
      legend: {
        labels: {
          fontFamily: 'Oswald',
          fontSize: 14,
          fontColor: '#000'
        }
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
        <canvas ref={canvas => this.canvas = canvas} height="100%" />
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
