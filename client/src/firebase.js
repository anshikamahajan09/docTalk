// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "doctalk-5f4bd.firebaseapp.com",
  projectId: "doctalk-5f4bd",
  storageBucket: "doctalk-5f4bd.appspot.com",
  messagingSenderId: "989799968250",
  appId: "1:989799968250:web:d15dae333edb1ada768843"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);