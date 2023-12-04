import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserReducer from './UserReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <UserReducer>
    <App />
    </UserReducer>
  </React.StrictMode>
);

