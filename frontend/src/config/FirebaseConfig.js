import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCRbZO8DkFm44aptzIoRjP4kg53rT_cA4c",
    authDomain: "dictionary-f01ce.firebaseapp.com",
    projectId: "dictionary-f01ce",
    storageBucket: "dictionary-f01ce.appspot.com",
    messagingSenderId: "227867230128",
    appId: "1:227867230128:web:676dcab0b4d65302b52075",
    measurementId: "G-LB4312Y24T"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);