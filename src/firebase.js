// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7dH7vd0vafvKvS3_2Iydt7mBZtw312aQ",
  authDomain: "pronos-app.firebaseapp.com",
  projectId: "pronos-app",
  storageBucket: "pronos-app.appspot.com",
  messagingSenderId: "611506491404",
  appId: "1:611506491404:web:81b3c9cbe6a1ea8c5a5e29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)