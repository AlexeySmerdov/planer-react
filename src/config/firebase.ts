// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdDmJbpin9ygw43Sot4ABBIBcMK-r7Ddo",
  authDomain: "my-planner-hffdi5.firebaseapp.com",
  projectId: "my-planner-hffdi5",
  storageBucket: "my-planner-hffdi5.appspot.com",
  messagingSenderId: "499412064286",
  appId: "1:499412064286:web:64d2b1d74d84f9966d360f",
  measurementId: "G-V5TDP5QHB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };
export default app;
