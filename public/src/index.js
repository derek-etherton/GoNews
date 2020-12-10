import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

require('babel-core/register');
require('babel-polyfill');

ReactDOM.render(<App />, document.getElementById('root'));