
import React, { useState } from 'react';
import { Container, Box, Select, MenuItem, Button, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/PDFPage.css';

function PDFPage() {
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [materialType, setMaterialType] = useState('');
  const navigate = useNavigate();

  // Sample course data - this should come from your backend
  const coursesBySemester = {
    1: ['Physics', 'Mathematics-I', 'Basic Electronics'],
    2: ['Chemistry', 'Mathematics-II', 'Programming'],
    3: ['Data Structures', 'Digital Logic', 'Discrete Mathematics'],
    4: ['Operating Systems', 'Computer Networks', 'Database Systems'],
    5: ['Software Engineering', 'Computer Architecture', 'Theory of Computation'],
    6: ['Compiler Design', 'Machine Learning', 'Web Development'],
    7: ['Cloud Computing', 'Artificial Intelligence', 'Cryptography'],
    8: ['Big Data Analytics', 'Internet of Things', 'Blockchain']
  };

  const materialTypes = ['Quiz', 'Midterm', 'Endterm', 'Notes'];

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setCourse(''); // Reset course when semester changes
  };

  return (
    <Container maxWidth="xl" className="pdf-container">
      <Box className="header">
        <Typography variant="h4">LNM Resources</Typography>
        <Avatar 
          className="profile-avatar"
          onClick={() => navigate('/profile')}
          src="/default-avatar.png"
        />
      </Box>

      <Box className="filters-section">
        <Select
          value={semester}
          onChange={handleSemesterChange}
          displayEmpty
          className="filter-select"
        >
          <MenuItem value="">Select Semester</MenuItem>
          {[1,2,3,4,5,6,7,8].map((sem) => (
            <MenuItem key={sem} value={sem}>Semester {sem}</MenuItem>
          ))}
        </Select>

        <Select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          displayEmpty
          className="filter-select"
          disabled={!semester}
        >
          <MenuItem value="">Select Course</MenuItem>
          {semester && coursesBySemester[semester].map((course) => (
            <MenuItem key={course} value={course}>{course}</MenuItem>
          ))}
        </Select>

        <Select
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value)}
          displayEmpty
          className="filter-select"
        >
          <MenuItem value="">Select Material Type</MenuItem>
          {materialTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box className="results-section">
        {/* Sample PDF entries - replace with actual data */}
        {[1, 2, 3].map((item) => (
          <Box key={item} className="pdf-card">
            <Box className="pdf-info">
              <Typography variant="h6">Sample PDF Title</Typography>
              <Typography variant="body2">by John Doe</Typography>
              <Typography variant="caption">2023</Typography>
            </Box>
            <Box className="pdf-actions">
              <Button variant="contained" color="primary">View</Button>
              <Button variant="outlined">Download</Button>
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        className="contribute-button"
        onClick={() => navigate('/contribute')}
      >
        Contribute
      </Button>
    </Container>
  );
}

export default PDFPage;
