import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('should calculate the totals for each language', () => {
  const repo = {
    HTML: 700, 
    JavaScript: 500
  };

  const totals = {
    HTML: 300, 
    CSS: 200, 
    JavaScript: 500
  };

  const expectedResult = {
    HTML: 1000,
    CSS: 200,
    JavaScript: 1000
  };

  calcLanguageTotals(repo, totals);

  expect(totals).toEqual(expectedResult);
});