export const getStatsWithAssets = () => {
  return async dispatch => {
    try {
      const stats = await dispatch(getStats());
      const response = await fetch("/assets");
      const assets = await response.json();
      dispatch(setStatsWithAssets(stats, assets));
    } catch(err) {
      console.error(err);
    }
  }
};

export const getStats = () => {
  return dispatch => {
    return fetch("/trading-pairs/stats")
    .then(response => response.json())
    .then(data => {
      dispatch(setStats(data));
      return data;
    })
    .catch(err => console.error(err));
  }
}

export const setStatsWithAssets = (stats, assets) => {
  return {
    type: 'SET_STATS_WITH_ASSETS',
    stats,
    assets,
  }
};

export const setStats = (stats) => {
  return {
    type: 'SET_STATS',
    stats,
  }
};