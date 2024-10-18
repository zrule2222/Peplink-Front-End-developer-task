import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { ShoppingListProvider } from './context/ShoppingListContext';

ReactDOM.render(
  <React.StrictMode>
    <ShoppingListProvider>
      <App />
    </ShoppingListProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
