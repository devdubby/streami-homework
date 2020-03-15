import { SET_STATS_AND_ASSETS } from "./types";

export const getStatsAndAssets = () => {
  return async dispatch => {
    try {
      const response_1 = await fetch("/trading-pairs/stats");
      const response_2 = await fetch("/assets");
      const response_3 = await fetch("/trading-pairs");
      const stats = await response_1.json();
      const assets = await response_2.json();
      const tradingPairs = await response_3.json();
      dispatch(setStatsAndAssets(stats, assets, tradingPairs));
    } catch(err) {
      console.error(err);
    }
  }
};

export const setStatsAndAssets = (stats, assets, tradingPairs) => {
  return {
    type: 'SET_STATS_AND_ASSETS',
    stats,
    assets,
    tradingPairs,
  }
};