import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import "./styles/Login.css";
import "./styles/PDFPage.css";
import "./styles/ProfilePage.css";
import Login from "./pages/Login";
import PDFPage from "./pages/PDFPage";
import ProfilePage from "./pages/ProfilePage";
import ContributePage from "./pages/ContributePage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setLoading(false); // Stop loading once Firebase auth check is done
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>; // Prevents premature redirects

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/pdf" replace /> : <Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />

          {/* Protected Routes */}
          <Route path="/pdf" element={user ? <PDFPage /> : <Navigate to="/" replace />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" replace />} />
          <Route path="/contribute" element={user ? <ContributePage /> : <Navigate to="/" replace />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;