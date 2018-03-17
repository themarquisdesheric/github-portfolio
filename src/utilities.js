export const calcLanguageTotals = (repoStats, totals) => {
  Object.keys(repoStats)
    .forEach(lang => {
      if (!totals[lang]) totals[lang] = 0;

      totals[lang] += repoStats[lang];
    });
};

export const calcRepoTotal = repoStats => 
  Object.keys(repoStats).reduce( (sum, lang) => 
    sum + repoStats[lang]   
    , 0);
