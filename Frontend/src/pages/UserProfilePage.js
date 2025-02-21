
import React, { useState } from 'react';
import { Container, Box, Typography, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/ProfilePage.css';

function UserProfilePage() {
  const navigate = useNavigate();
  const [contributions, setContributions] = useState([
    { id: 1, title: 'SWE Midterm Paper', year: 2022, likes: 20, liked: false },
    { id: 2, title: 'CTIOT Endterm Paper', year: 2021, likes: 25, liked: false }
  ]);

  const handleLike = (pdfId) => {
    setContributions(contributions.map(pdf => 
      pdf.id === pdfId ? { 
        ...pdf, 
        likes: pdf.liked ? pdf.likes - 1 : pdf.likes + 1,
        liked: !pdf.liked 
      } : pdf
    ));
  };

  return (
    <Container maxWidth="xl" className="profile-container">
      <Box className="profile-header">
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/pdf')}
          className="back-button"
        >
          Back
        </Button>
        <Typography variant="h4">LNM Resources</Typography>
      </Box>

      <Box className="profile-content">
        <Box className="profile-info">
          <Avatar
            src="/default-avatar.png"
            className="profile-avatar"
          />
          <Typography variant="h5">Miten vipul solanki</Typography>
          <Typography variant="body1" className="roll-number">22ucs124</Typography>
        </Box>

        <Box className="contributions-section">
          <Typography variant="h6" className="section-title">Contributions</Typography>
          <Box className="pdf-list">
            {contributions.map((pdf) => (
              <Box key={pdf.id} className="pdf-item">
                <Box className="pdf-year">{pdf.year}</Box>
                <Box className="pdf-details">
                  <Typography variant="h6">{pdf.title}</Typography>
                  <Box className="pdf-actions">
                    <Button variant="contained" color="primary">View</Button>
                    <Button variant="contained">Download</Button>
                    <Button onClick={() => handleLike(pdf.id)}>
                      {pdf.liked ? <span style={{color: 'red'}}>❤️</span> : <span>❤️</span>} {pdf.likes}
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default UserProfilePage;
