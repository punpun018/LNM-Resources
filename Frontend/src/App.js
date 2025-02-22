
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';import './App.css';
import './styles/Login.css';
import './styles/PDFPage.css';
import './styles/ProfilePage.css';
import Login from './pages/Login';
import PDFPage from './pages/PDFPage';
import ProfilePage from './pages/ProfilePage';
import ContributePage from './pages/ContributePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/pdf" element={<PDFPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import PDFPage from './pages/PDFPage';
// import ProfilePage from './pages/ProfilePage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/pdf" element={<PDFPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
