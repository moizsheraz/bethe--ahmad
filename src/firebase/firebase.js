import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider } from "firebase/auth"
import {getStorage} from "firebase/storage"
import { getFirestore, collection, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyA06l9PycCk3pp5sQSIvFVItYyai5d-7MQ",
  authDomain: "giftflow-2ce98.firebaseapp.com",
  projectId: "giftflow-2ce98",
  storageBucket: "giftflow-2ce98.appspot.com",
  messagingSenderId: "50552621869",
  appId: "1:50552621869:web:8b4bf101a696ba03f821a4",
  measurementId: "G-9G3DK8X3MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export{ app,  auth, firestore, storage , googleProvider  };
