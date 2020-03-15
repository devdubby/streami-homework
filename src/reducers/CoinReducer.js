import { SET_STATS_AND_ASSETS } from "../actions/types";

const initialState = {
  stats: [],
  assets: [],
  mergeAssets: {},
  marketList: [],
}

const hashFunc = (stats, assets, tradingPairs) => {
  let count = 0;
  const margetList = {};
  
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_STATS_AND_ASSETS:
      const { stats, assets, tradingPairs } = action;
      hashFunc(stats, assets, tradingPairs);
      return {
        ...state,
        stats: action.stats,
        assets: action.assets,
        tradingPairs: action.tradingPairs,
      }
    default:
      return state;
  }
};