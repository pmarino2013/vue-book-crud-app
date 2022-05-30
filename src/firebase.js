import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR APIKEY",
  authDomain: "YOUR AUTHDOMAIN",
  projectId: "YOUR PROJECTID",
  storageBucket: "YOUR STORAGEBUCKET",
  messagingSenderId: "YOUR MESSAGINGSENDERID",
  appId: "YOURAPPID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
