import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyByuF8l4p9UihIkVd0JmBD9QOFCE-Qx0Fo",
    authDomain: "capyflow-academy-6de6b.firebaseapp.com",
    projectId: "capyflow-academy-6de6b",
    storageBucket: "capyflow-academy-6de6b.firebasestorage.app",
    messagingSenderId: "546534461706",
    appId: "1:546534461706:web:23332d758639af23a4aaf3",
    measurementId: "G-PDVEHD4PVG"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Analytics is only supported in the browser
let analytics;
if (typeof window !== 'undefined') {
    isSupported().then(yes => {
        if (yes) analytics = getAnalytics(app);
    });
}

export { app, auth, analytics };
