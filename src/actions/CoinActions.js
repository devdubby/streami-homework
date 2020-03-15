export const getStatsWithAssets = () => {
  return async dispatch => {
    try {
      const response_1 = await fetch("/trading-pairs/stats");
      const response_2 = await fetch("/assets");
      const stats = await response_1.json();
      const assets = await response_2.json();
      dispatch(setStatsWithAssets(stats, assets));
    } catch(err) {
      console.error(err);
    }
  }
};

export const setStatsWithAssets = (stats, assets) => {
  return {
    type: 'SET_STATS_WITH_ASSETS',
    stats,
    assets,
  }
};