import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContextProvider from './store/user-context';
import RecipesContextProvider from './store/recipes-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
        <RecipesContextProvider>
          <App />
        </RecipesContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

