import { calcLanguageTotals, calcRepoTotal } from './utilities';

describe('github statistics', () => {
  const repo = {
    HTML: 300, 
    CSS: 200, 
    JavaScript: 500
  };

  it('should calculate the sum of all languages for each repo', () => {
    const expectedResult = 1000;

    const repoTotal = calcRepoTotal(repo);

    expect(repoTotal).toEqual(expectedResult);
  });

  it('should calculate the percentages of each language for each repo', () => {
    const repoWithTotal = {
      ...repo, 
      total: 1000 
    };

    const expectedResult = {
      HTML: 30,
      CSS: 20,
      JavaScript: 50
    };

    const result = calcLangPercentages(repoWithTotal);

    expect(result).toEqual(expectedResult);
  });

  it('should calculate the percentages of each language for each repo, and round the output', () => {
    const repoWithTotal = {
      HTML: 420, 
      CSS: 250, 
      JavaScript: 700,
      total: 1370 
    };

    const expectedResult = {
      HTML: 31,
      CSS: 18,
      JavaScript: 51
    };

    const result = calcLangPercentages(repoWithTotal);

    expect(result).toEqual(expectedResult);
  });

  it('should calculate the totals for each language', () => {
    const prevRepo = {
      HTML: 700, 
      JavaScript: 500
    };
  
    const expectedResult = {
      HTML: 1000,
      CSS: 200,
      JavaScript: 1000
    };
  
    calcLanguageTotals(prevRepo, repo);
  
    expect(repo).toEqual(expectedResult);
  });
});

