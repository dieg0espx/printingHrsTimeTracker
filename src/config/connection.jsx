import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA18TrxQ5sc-y6OIlwHvqZcTS0Y_acfous",
//   authDomain: "hourtacker.firebaseapp.com",
//   projectId: "hourtacker",
//   storageBucket: "hourtacker.appspot.com",
//   messagingSenderId: "113594026628",
//   appId: "1:113594026628:web:d3b793135cbf3374f050d1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC-KWfTjAeIPwHpTsLszj3kQivJCP1q8zk",
  authDomain: "projects---time-tracker.firebaseapp.com",
  projectId: "projects---time-tracker",
  storageBucket: "projects---time-tracker.appspot.com",
  messagingSenderId: "568759201469",
  appId: "1:568759201469:web:865d3ff034d22242af11d4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);