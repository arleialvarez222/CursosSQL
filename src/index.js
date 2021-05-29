import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {initialState} from './Contexto/initialState';
import {StateProvider} from './Contexto/store'; 
import {mainReducer} from './Contexto/Reducers';

ReactDOM.render(
  <>
    <StateProvider initialState={initialState} reducer={mainReducer} >
      <App/>
    </StateProvider>

  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
