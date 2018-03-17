const calcLanguageTotals = (repoStats, totals) => {
  Object.keys(repoStats)
    .forEach(lang => {
      if (!totals[lang]) totals[lang] = 0;

      totals[lang] += repoStats[lang];
    });
};

export default calcLanguageTotals;
