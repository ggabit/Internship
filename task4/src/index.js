import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Nav from './reducers/nav';

/*// action -> what you want to do
const funcname = () => {
  return{
    type: 'FUNCNAME'
  };
};

// reducer -> check what to do depending on action
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'FUNCNAME':
      return state + 1;
  }
};*/


store.subscribe(() => console.log(store.getState()));

// dispatch an action -> executes it -> the store gets updated
//store.dispatch(funcname());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
