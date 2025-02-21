import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const firebaseConfig = {
  apiKey: "AIzaSyBKxz2XTIo2RaMKlV7xVuXoPB0Z0WqemY4",
  authDomain: "lnmresources2403.firebaseapp.com",
  projectId: "lnmresources2403",
  storageBucket: "lnmresources2403.firebasestorage.app",
  messagingSenderId: "450150295234",
  appId: "1:450150295234:web:72068b6509975e8cb2bd5b",
  measurementId: "G-CD0Z6Z1XVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);