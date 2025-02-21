import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { storage, db, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/ContributePage.css';

function ContributePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [year, setYear] = useState('');

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !semester || !course || !materialType || !year) {
      alert('Please fill all fields');
      return;
    }

    try {
      const fileRef = ref(storage, `materials/${semester}/${course}/${materialType}/${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'materials'), {
        semester,
        course,
        materialType,
        year,
        fileName: file.name,
        fileURL: downloadURL,
        uploadedBy: auth.currentUser?.uid,
        uploadedAt: new Date().toISOString()
      });

      alert('Upload successful!');
      navigate('/pdf');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="contribute-container">
      <Typography variant="h4" className="title">
        Contribute Material
      </Typography>
      <Box className="form-container">
        <Select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          displayEmpty
          fullWidth
          className="form-field"
        >
          <MenuItem value="">Select Semester</MenuItem>
          {Object.keys(coursesBySemester).map((sem) => (
            <MenuItem key={sem} value={sem}>Semester {sem}</MenuItem>
          ))}
        </Select>

        <Select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          displayEmpty
          fullWidth
          disabled={!semester}
          className="form-field"
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
          fullWidth
          className="form-field"
        >
          <MenuItem value="">Select Material Type</MenuItem>
          {materialTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>

        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          displayEmpty
          fullWidth
          className="form-field"
        >
          <MenuItem value="">Select Year</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input"
        />

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || !semester || !course || !materialType || !year}
          className="upload-button"
        >
          Upload
        </Button>
      </Box>
    </Container>
  );
}

export default ContributePage;