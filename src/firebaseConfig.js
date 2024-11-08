import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCrLgRq2XEPxGV5hqf130mCc-B8AWoeMvU",
  authDomain: "desafio13-ef3a5.firebaseapp.com",
  projectId: "desafio13-ef3a5",
  storageBucket: "desafio13-ef3a5.firebasestorage.app",
  messagingSenderId: "701949035766",
  appId: "1:701949035766:web:ce556f571255e3b57318d7",
  measurementId: "G-PYBD2Z32YL"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);