import { calcLanguageTotals, calcRepoTotal } from './utilities';

describe('github statistics', () => {
  
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

  it('should calculate the sum of all languages for each repo', () => {
    const repo = {
      HTML: 300, 
      CSS: 200, 
      JavaScript: 500
    };

    const expectedResult = 1000;

    const result = calcRepoTotal(repo);

    expect(result).toEqual(expectedResult);
  });
});

