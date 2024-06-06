import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

import UserContextProvider from './store/user-context';
import RecipesContextProvider from './store/recipes-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
        <RecipesContextProvider>
          <App />
          <ToastContainer 
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
        </RecipesContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

