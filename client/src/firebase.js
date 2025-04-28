// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "peaknest-5f071.firebaseapp.com",
  projectId: "peaknest-5f071",
  storageBucket: "peaknest-5f071.firebasestorage.app",
  messagingSenderId: "106221606138",
  appId: "1:106221606138:web:4fdad147e40b3bce4ba543"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);