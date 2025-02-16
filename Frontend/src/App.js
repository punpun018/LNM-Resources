
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/Login.css';
import './styles/PDFPage.css';
import Login from './pages/Login';
import PDFPage from './pages/PDFPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pdf" element={<PDFPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
