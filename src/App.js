import React from 'react';
import Coin from "./Coin/Coin";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from "./reducers";
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Coin />
      </div>
    </Provider>
  );
}

export default App;
