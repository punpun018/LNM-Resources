import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email.endsWith('@lnmiit.ac.in')) {
        alert('Only LNMIIT emails are allowed');
        await auth.signOut();
        return;
      }

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user in Firestore
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }

      navigate('/pdf');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleGuestLogin = () => {
    navigate('/pdf');
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box className="login-box">
        <Typography variant="h3" className="title">
          LNM Resources
        </Typography>
        <Button
          variant="contained"
          onClick={handleGoogleLogin}
          className="google-button"
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          onClick={handleGuestLogin}
          className="guest-button"
        >
          Continue as Guest
        </Button>
      </Box>
    </Container>
  );
}

export default Login;