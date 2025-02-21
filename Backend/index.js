
// import express from "express";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import cors from "cors";

// const app = express();
// const PORT = 3001;
// const HOST = "0.0.0.0";


// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);

// app.use(cors());
// app.use(express.json());

// // Authentication middleware
// const authenticateUser = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split('Bearer ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//     const decodedToken = await auth.verifyIdToken(token);
//     if (!decodedToken.email.endsWith('@lnmiit.ac.in')) {
//       return res.status(403).json({ error: 'Only LNMIIT emails are allowed' });
//     }
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// // Routes
// app.post('/api/auth/google', async (req, res) => {
//   try {
//     const { idToken } = req.body;
//     const decodedToken = await auth.verifyIdToken(idToken);

//     if (!decodedToken.email.endsWith('@lnmiit.ac.in')) {
//       return res.status(403).json({ error: 'Only LNMIIT emails are allowed' });
//     }

//     // Check if user exists
//     const usersRef = collection(db, 'users');
//     const q = query(usersRef, where('email', '==', decodedToken.email));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       // Create new user
//       await addDoc(usersRef, {
//         name: decodedToken.name,
//         email: decodedToken.email,
//         profile_image: decodedToken.picture,
//         created_at: new Date().toISOString()
//       });
//     }

//     res.json({ token: idToken });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Protected routes
// app.get('/api/files', authenticateUser, async (req, res) => {
//   try {
//     const filesRef = collection(db, 'files');
//     const querySnapshot = await getDocs(filesRef);
//     const files = [];
//     querySnapshot.forEach((doc) => {
//       files.push({ id: doc.id, ...doc.data() });
//     });
//     res.json(files);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, HOST, () => {
//   console.log(`Server running on http://${HOST}:${PORT}`);
// });
