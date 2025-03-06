 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyB_eF7mxgMtZoGFp77w8u-CATfOe80zOOs",
   authDomain: "quieroentrenar-5a9de.firebaseapp.com",
   projectId: "quieroentrenar-5a9de",
   storageBucket: "quieroentrenar-5a9de.firebasestorage.app",
   messagingSenderId: "368766826116",
   appId: "1:368766826116:web:9aeea1210dba4c6a7634d1",
   measurementId: "G-89DFLCSWDR"
 };

 // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 