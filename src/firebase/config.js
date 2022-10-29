// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeoBgvUjicKnQg-gyE7N7TwhFJLiEJ-9U",
  authDomain: "app-movies-e420f.firebaseapp.com",
  projectId: "app-movies-e420f",
  storageBucket: "app-movies-e420f.appspot.com",
  messagingSenderId: "100265804524",
  appId: "1:100265804524:web:334f822755258881e9dbc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
