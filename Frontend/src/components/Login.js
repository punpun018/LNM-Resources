import React from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "./firebase";

const Login = () => {
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error("Login Failed", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
