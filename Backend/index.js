const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase-admin/app');
const { getAuth, getFirestore, collection, getDocs } = require('firebase-admin/auth');
const { getFirestore, collection, addDoc, query, where, getDocs } = require('firebase-admin/firestore');


const app = express();
const PORT = 3001;
const HOST = "0.0.0.0";

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Initialize Firebase Admin
const admin = initializeApp({
  credential: require('firebase-admin').credential.cert({
    projectId: "lnmresources2403",
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});

const db = getFirestore();
const auth = getAuth();


// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decodedToken = await auth.verifyIdToken(token);
    if (!decodedToken.email.endsWith('@lnmiit.ac.in')) {
      return res.status(403).json({ error: 'Only LNMIIT emails are allowed' });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/api/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await auth.verifyIdToken(idToken);

    if (!decodedToken.email.endsWith('@lnmiit.ac.in')) {
      return res.status(403).json({ error: 'Only LNMIIT emails are allowed' });
    }

    // Check if user exists (This part was missing from the edited code but is crucial)
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', decodedToken.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Create new user
      await addDoc(usersRef, {
        name: decodedToken.name,
        email: decodedToken.email,
        profile_image: decodedToken.picture,
        created_at: new Date().toISOString()
      });
    }

    res.json({ token: idToken });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Protected routes
app.get('/api/files', authenticateUser, async (req, res) => {
  try {
    const filesRef = collection(db, 'files');
    const querySnapshot = await getDocs(filesRef);
    const files = [];
    querySnapshot.forEach((doc) => {
      files.push({ id: doc.id, ...doc.data() });
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});