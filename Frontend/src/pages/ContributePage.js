
import React, { useState } from 'react';
import { Container, Box, Select, MenuItem, Button, Typography, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { storage, db, auth } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/ContributePage.css';

function ContributePage() {
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const coursesBySemester = {
    1: ['CLP', 'M1', 'BE', 'BE Lab', 'CP', 'CP Lab', 'TCE', 'IKS'],
    2: ['M2', 'UG Lab', 'DSA', 'VEE', 'EEB', 'DMS', 'DSY', 'IMP', 'ANEL'],
    3: ['M3', 'EFE', 'PTS', 'COA', 'AP', 'IDBMS', 'OTA'],
    4: ['P&S', 'DAA', 'TOC', 'OS', 'CN'],
    5: ['AI', 'CS', 'IDS', 'SWE', 'ISDL'],
    6: ['CD', 'IGT', 'SDPS', 'MMD', 'ISM'],
    7: ['Cloud Computing', 'Artificial Intelligence', 'Cryptography'],
    8: ['Big Data Analytics', 'Internet of Things', 'Blockchain']
  };

  const materialTypes = ['Quiz', 'Midterm', 'Endterm', 'Notes'];
  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019'];

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = async () => {
    if (!semester || !course || !materialType || !year || !file || !auth.currentUser) {
      alert('Please fill all fields and upload a file');
      return;
    }

    try {
      setUploading(true);

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `files/${auth.currentUser.uid}/${file.name}-${Date.now()}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(uploadResult.ref);

      // Add document to files collection
      const fileData = {
        course,
        file_type: materialType,
        file_url: fileUrl,
        file_year: year,
        likes: 0,
        semester: parseInt(semester),
        user_id: auth.currentUser.uid,
        created_at: new Date().toISOString()
      };

      await addDoc(collection(db, 'files'), fileData);

      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/pdf');
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="xl" className="contribute-container">
      <Box className="header">
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/pdf')}
          className="back-button"
        >
          Back
        </Button>
        <Typography variant="h2">LNM Resources</Typography>
      </Box>

      <Typography variant="h5" className="upload-title">
        Upload resources you have to help others
      </Typography>

      <Box className="upload-form">
        <Select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          displayEmpty
          className="form-select"
          sx={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "18px" }}
        >
          <MenuItem value="">Sem</MenuItem>
          {[1,2,3,4,5,6,7,8].map((sem) => (
            <MenuItem key={sem} value={sem}>Semester {sem}</MenuItem>
          ))}
        </Select>

        <Select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          displayEmpty
          className="form-select"
          disabled={!semester}
        >
          <MenuItem value="">Subject</MenuItem>
          {semester && coursesBySemester[semester].map((course) => (
            <MenuItem key={course} value={course}>{course}</MenuItem>
          ))}
        </Select>

        <Select
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value)}
          displayEmpty
          className="form-select"
        >
          <MenuItem value="">Type</MenuItem>
          {materialTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>

        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          displayEmpty
          className="form-select"
        >
          <MenuItem value="">Year</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            variant="outlined"
            component="span"
            className="upload-button"
            fullWidth
          >
            {file ? file.name : 'Upload PDF'}
          </Button>
        </label>
        <Typography variant="caption" className="file-limit">
          (Max 10 MB per file)
        </Typography>

        <Button
          variant="contained"
          onClick={handleSubmit}
          className="save-button"
          disabled={!semester || !course || !materialType || !year || !file || uploading}
          sx={{ fontFamily: "Arial", fontWeight: "bold", fontSize: "18px" }}
        >
          {uploading ? 'Uploading...' : 'Save'}
        </Button>
      </Box>

      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        className="success-modal"
      >
        <Box className="success-content">
          <Typography>File uploaded successfully!</Typography>
        </Box>
      </Modal>
    </Container>
  );
}

export default ContributePage;
