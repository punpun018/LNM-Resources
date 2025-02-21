
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import '../firebase';

function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email.endsWith('@lnmiit.ac.in')) {
        alert('Only LNMIIT emails are allowed');
        await auth.signOut();
        return;
      }

      const idToken = await user.getIdToken();
      const response = await axios.post('http://0.0.0.0:3001/api/auth/google', {
        idToken
      });

      localStorage.setItem('token', response.data.token);
      navigate('/pdf');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xl" className="login-container">
      <Box className="login-content">
        <Box className="login-left">
          <img src="/attached_assets/computer-illustration.png" alt="Computer" className="login-illustration" />
        </Box>
        <Box className="login-right">
          <Typography variant="h2" className="title">
            LNM Resources
          </Typography>
          <Typography variant="h4" className="subtitle">
            Simplify Your Exam Prep with LNMIIT Resources
          </Typography>
          <Box className="login-buttons">
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              className="google-button"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
