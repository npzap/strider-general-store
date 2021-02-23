import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import {applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers'
import middlewhare from './middleware'

const store = createStore(reducer, middlewhare);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


