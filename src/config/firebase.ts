// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCfq60XLEJenTrV5Ksk4PFAxrbAI15gePE",
  authDomain: "info-6132f.firebaseapp.com",
  projectId: "info-6132f",
  storageBucket: "info-6132f.firebasestorage.app",
  messagingSenderId: "215210563499",
  appId: "1:215210563499:web:6214696b0be8360d5be4ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);