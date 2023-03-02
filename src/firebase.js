// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJW2_8Nds7tdNdIiCLFN_OUuEXock7wP0",
  authDomain: "music-mentor-78cb0.firebaseapp.com",
  projectId: "music-mentor-78cb0",
  storageBucket: "music-mentor-78cb0.appspot.com",
  messagingSenderId: "791541709827",
  appId: "1:791541709827:web:009b8b5d785ddcaccce236",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
