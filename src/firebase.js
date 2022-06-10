// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQf8DHVtKvkich3P_oA9IJKhLKsOXziKk",
    authDomain: "myprojectvuejs-d2faa.firebaseapp.com",
    projectId: "myprojectvuejs-d2faa",
    storageBucket: "myprojectvuejs-d2faa.appspot.com",
    messagingSenderId: "1841299399",
    appId: "1:1841299399:web:980374897c660451c223e2",
    measurementId: "G-W1CKCBBK9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default { app, analytics,};

