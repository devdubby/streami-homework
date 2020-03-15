import { SET_STATS_WITH_ASSETS, FILTER_ITEMS, ON_CHANGE_ITEMS, SET_STATS } from "../actions/types";

const initialState = {
  originItems: {},
  items: [],
  filteringStr: "KRW",
  stats: [],
}

const formatItems = (stats, assets) => {
  const items = {};
  stats.forEach(stat => {
    items[stat.name] = stat;
    items[stat.name].currencyUnit = stat.name.substring(4);
    assets.forEach(asset => {
      if(stat.name.indexOf(asset.id) === 0)
        items[stat.name].label = asset.name;
    });
  });
  return items;
};

const checkUpdatedTime = (items, stats) => {
  const newItems = [...items];
  items.forEach((item, index) => {
    stats.forEach(stat => {
      if(item.name === stat.name && item.close !== stat.close) {
        newItems[index].close = stat.close;
      }
    });
  });
  return newItems;
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_STATS_WITH_ASSETS:
      const { stats, assets } = action;
      const formatedItems = {...formatItems(stats, assets)};
      return {
        ...state,
        originItems: formatedItems,
        items: Object.values(formatedItems).filter(item => item.currencyUnit.indexOf(state.filteringStr) !== -1)
      }
    case FILTER_ITEMS:
      const filteringItems = Object.values(state.originItems).filter(item => item.currencyUnit.indexOf(action.filteringStr) !== -1);
      return {
        ...state,
        items: filteringItems,
        filteringStr: action.filteringStr,
      }
    case ON_CHANGE_ITEMS:
      const str = action.inputValue.toUpperCase();
      const onChangeItems = Object.values(state.originItems).filter(
        item => item.name.indexOf(str) !== -1 || item.label.indexOf(str) !== -1);
      return {
        ...state,
        items: onChangeItems
      }
    case SET_STATS:
      const newItems = [...checkUpdatedTime(state.items, action.stats)];
      console.log(newItems);
      return {
        ...state,
        stats: action.stats,
        items: newItems,
      }
    default:
      return state;
  }
};