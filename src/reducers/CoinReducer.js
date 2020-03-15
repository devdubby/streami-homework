import { SET_STATS_WITH_ASSETS, FILTER_ITEMS, ON_CHANGE_ITEMS } from "../actions/types";

const initialState = {
  originItems: {},
  items: [],
  filteringStr: "KRW"
}

const formatItems = (stats, assets) => {
  let count = 1;
  const items = {};
  stats.forEach(stat => {
    items[count] = stat;
    items[count].currencyUnit = stat.name.substring(4);
    assets.forEach(asset => {
      if(stat.name.indexOf(asset.id) === 0)
        items[count].label = asset.name;
    })
    count += 1;
  });
  return items;
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_STATS_WITH_ASSETS:
      const { stats, assets } = action;
      const formatedItems = formatItems(stats, assets)
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
    default:
      return state;
  }
};