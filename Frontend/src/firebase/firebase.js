
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKxz2XTIo2RaMKlV7xVuXoPB0Z0WqemY4",
  authDomain: "lnmresources2403.firebaseapp.com",
  projectId: "lnmresources2403",
  storageBucket: "lnmresources2403.firebasestorage.app",
  messagingSenderId: "450150295234",
  appId: "1:450150295234:web:72068b6509975e8cb2bd5b",
  measurementId: "G-CD0Z6Z1XVG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const storage = getStorage(app);
export { auth, db, googleProvider, storage };
