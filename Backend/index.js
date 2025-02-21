
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const PORT = 3001;
const HOST = "0.0.0.0";

// Initialize Firebase Admin with service account
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken.email?.endsWith('@lnmiit.ac.in')) {
      return res.status(403).json({ error: 'Only LNMIIT emails are allowed' });
    }
    
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Auth route
app.post('/api/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken.email?.endsWith('@lnmiit.ac.in')) {
      return res.status(403).json({ error: 'Only LNMIIT emails are allowed' });
    }

    // Check/create user in Firestore
    const db = admin.firestore();
    const userRef = db.collection('users').doc(decodedToken.uid);
    await userRef.set({
      name: decodedToken.name,
      email: decodedToken.email,
      profile_image: decodedToken.picture,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // Create custom token for frontend
    const customToken = await admin.auth().createCustomToken(decodedToken.uid);
    res.json({ token: customToken });

  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Protected route example
app.get('/api/files', authenticateUser, async (req, res) => {
  try {
    const db = admin.firestore();
    const filesSnapshot = await db.collection('files').get();
    const files = [];
    filesSnapshot.forEach(doc => {
      files.push({ id: doc.id, ...doc.data() });
    });
    res.json(files);
  } catch (error) {
    console.error('Files error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
