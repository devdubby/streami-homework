import { combineReducers } from 'redux';
import CoinReducer from './CoinReducer';

export default combineReducers({
  coin: CoinReducer,
});