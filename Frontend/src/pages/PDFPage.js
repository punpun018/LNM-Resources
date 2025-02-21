import React, { useState } from 'react';
import { Container, Box, Select, MenuItem, Button, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/PDFPage.css';

function PDFPage() {
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showYearFilter, setShowYearFilter] = useState(false);
  const [pdfs, setPdfs] = useState([
    { id: 1, title: 'SWE Midterm Paper', author: 'Ayush Jain', authorId: 1, year: 2022, likes: 20, liked: false },
    { id: 2, title: 'CTIOT Endterm Paper', author: 'John Doe', authorId: 2, year: 2023, likes: 15, liked: false },
    { id: 3, title: 'ML Quiz Paper', author: 'Jane Smith', authorId: 3, year: 2022, likes: 25, liked: false },
  ]);
  const navigate = useNavigate();

  const handleLike = (pdfId) => {
    setPdfs(pdfs.map(pdf => {
      if (pdf.id === pdfId) {
        return { ...pdf, likes: pdf.liked ? pdf.likes -1 : pdf.likes + 1, liked: !pdf.liked };
      }
      return pdf;
    }));
  };

  const handleAuthorClick = (authorId) => {
    navigate(`/user/${authorId}`);
  };

  // Sample course data - this should come from your backend
  const coursesBySemester = {
    1: ['CLP', 'M1', 'BE', 'BE Lab', 'CP', 'CP Lab', 'TCE', 'IKS' ],
    2: ['M2', 'UG Lab', 'DSA', 'VEE', 'EEB', 'DMS', 'DSY', 'IMP', 'ANEL'],
    3: ['M3', 'EFE', 'PTS', 'COA', 'AP', 'IDBMS', 'OTA'],
    4: ['P&S', 'DAA', 'TOC', 'OS', 'CN'],
    5: ['AI', 'CS', 'IDS', 'SWE', 'ISDL'],
    6: ['CD', 'IGT', 'SDPS', 'MMD', 'ISM'],
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
        <Typography variant="h3" className="title">LNM Resources</Typography>
        <Avatar 
          className="profile-avatar"
          onClick={() => navigate('/profile')}
          src="/default-avatar.png"

        />
      </Box>


      <Box className="filters-section">
        <Box className="filters-group">
          <Select
          value={semester}
          onChange={handleSemesterChange}
          displayEmpty
          className="filter-select"
          sx={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "18px" }} // Apply styles
        >
          <MenuItem value=""> Sem</MenuItem>
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
          sx={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "18px" }}
        >
          <MenuItem value=""> Course</MenuItem>
          {semester && coursesBySemester[semester].map((course) => (
            <MenuItem key={course} value={course}>{course}</MenuItem>
          ))}
        </Select>

        <Select
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value)}
          displayEmpty
          className="filter-select"
          sx={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "18px" }}
        >
          <MenuItem value=""> Type</MenuItem>
          {materialTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>

        {showYearFilter && (
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            displayEmpty
            className="filter-select"
          >
            <MenuItem value=""> Year</MenuItem>
            {[2025, 2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        )}
        </Box>
        <Button 
          variant="contained"
          disabled={!semester || !course || !materialType}
          onClick={() => setShowYearFilter(true)}
          sx={{
            width: "150px",
            backgroundColor: "#D1E7C1",
            color: "black",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 0",
            border: "1px solid black",
            "&:hover": { backgroundColor: "#BFD8A4" } // Slightly darker on hover
          }}
        >
          Search
        </Button>

      </Box>

      <Box className="results-section">
        {pdfs
          .filter(pdf => !selectedYear || pdf.year === selectedYear)
          .map((pdf) => (
          <Box key={pdf.id} className="pdf-card">
            <Box className="year-badge">{pdf.year}</Box>
            <Box className="pdf-info">
              <Typography variant="h6">{pdf.title}</Typography>
              <Typography 
                variant="body2"
              >
                by {pdf.author}
              </Typography>
            </Box>
            <Box className="pdf-actions">
              <Button variant="contained" className="view-button">View</Button>
              <Button variant="contained" className="download-button">Download</Button>
              <Box 
                className={`like-button ${pdf.liked ? 'liked' : ''}`}
                onClick={() => handleLike(pdf.id)}
              >
                {pdf.liked ? '❤️' : '🤍'} {pdf.likes}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/*  Implement responsive design and alignment here */}
      {/* Add like functionality to profile page here */}

      <Button
        variant="contained"
        className="contribute-button"
        onClick={() => navigate('/contribute')}
        sx={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "15px" }}
      >
        Contribute
      </Button>
    </Container>
  );
}

export default PDFPage;