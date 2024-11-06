// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjRd-cDN-Vm3fBilEucWhjvHAgxC8DNPg", // Your API key
    authDomain: "movie-157b3.firebaseapp.com",  // Your Auth Domain
    projectId: "movie-157b3",                   // Your Firebase project ID
    storageBucket: "movie-157b3.firebasestorage.app", // Your Firebase storage bucket
    messagingSenderId: "203534531954",          // Your Sender ID
    appId: "1:203534531954:web:4b43b0757e5316fe3bf1eb", // Your Firebase app ID
    measurementId: "G-BWCPH92QZT"               // Your Firebase measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Firebase Analytics if you need analytics tracking
const analytics = getAnalytics(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

// Example function to save user preferences to Firebase
function saveUserPreferences(genre, type, mood, rating) {
    const preferencesRef = ref(database, 'userPreferences');
    push(preferencesRef, {
        genre: genre,
        type: type,
        mood: mood,
        rating: rating
    }).then(() => {
        console.log("Preferences saved successfully!");
    }).catch((error) => {
        console.error("Error saving preferences:", error);
    });
}

// Example function to get data from Firebase
function getUserPreferences() {
    const preferencesRef = ref(database, 'userPreferences');
    onValue(preferencesRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);  // This will log the preferences stored in Firebase
    });
}

// Example function that uses Firebase data (optional)
function findMovies() {
    const genre = document.getElementById('genre').value;
    const type = document.getElementById('type').value;
    const mood = document.getElementById('mood').value;
    const rating = document.getElementById('rating').value;

    // Save the preferences to Firebase (optional)
    saveUserPreferences(genre, type, mood, rating);

    // Continue with your logic to fetch movie data (e.g., from TMDb API)
}
