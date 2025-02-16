
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    navigate('/pdf');
  };

  return (
    <Container maxWidth="xl" className="login-container">
      <Box className="login-content">
        <Box className="login-left">
          <img src="/computer-illustration.svg" alt="Computer" className="login-illustration" />
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
              Continue with google
            </Button>
            <Button
              variant="outlined"
              className="guest-button"
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
