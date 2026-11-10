import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Prevent browser from restoring an unwanted previous scroll position on fresh page load or reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Ensure fresh page loads without an anchor hash start at the top of the page
if (typeof window !== 'undefined') {
  if (!window.location.hash || window.location.hash === '#top') {
    window.scrollTo(0, 0);
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
