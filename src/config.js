import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDGABH0MimtzTKJJ7spOvFKkxhdFEgR-9Y",
  authDomain: "kera-tickets.firebaseapp.com",
  projectId: "kera-tickets",
  storageBucket: "kera-tickets.appspot.com",
  messagingSenderId: "862819028525",
  appId: "1:862819028525:web:a9a6769ece30a6d124b2a4",
  measurementId: "G-Q8NCRPN72Z"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
