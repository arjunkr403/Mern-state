// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-dc2d6.firebaseapp.com",
  projectId: "mern-estate-dc2d6",
  storageBucket: "mern-estate-dc2d6.appspot.com",
  messagingSenderId: "693068664540",
  appId: "1:693068664540:web:e2f521574a4628b3e7ee19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);