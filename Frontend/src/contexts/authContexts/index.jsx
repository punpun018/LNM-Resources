import { createContext, useContext, useEffect, useState } from "react";
import { loginWithGoogle, logout, onAuthStateChange } from "../services/auth";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth
export const useAuth = () => useContext(AuthContext);
