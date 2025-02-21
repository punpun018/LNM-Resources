
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Authentication successful:", user);

  if (!user.email.endsWith('@lnmiit.ac.in')) {
        alert('Only LNMIIT emails are allowed');
        await auth.signOut();
        return;
      }

      const idToken = await user.getIdToken();
      console.log("ID Token obtained:", idToken);

      const response = await axios.post('https://port3001-${REPL_SLUG}.${REPL_OWNER}.repl.co/api/auth/google', {
        idToken
      });
      console.log("Backend response:", response.data);

      localStorage.setItem('token', response.data.token);
      navigate('/pdf');
    } catch (error) {
      console.error('Login error details:', error.code, error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleGuestLogin = () => {
    navigate('/pdf');
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
            <Button
              variant="contained"
              className="guest-button"
              onClick={handleGuestLogin}
            >
              Guest Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
