// Firebase setup (v11)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjRd-cDN-Vm3fBilEucWhjvHAgxC8DNPg",
    authDomain: "movie-157b3.firebaseapp.com",
    projectId: "movie-157b3",
    storageBucket: "movie-157b3.firebasestorage.app",
    messagingSenderId: "203534531954",
    appId: "1:203534531954:web:6c52404d4e40ebe43bf1eb",
    measurementId: "G-9975F0DVV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// TMDb API Setup
const apiKey = 'YOUR_TMDB_API_KEY';  // Replace with your actual API key
const tmdbBaseUrl = 'https://api.themoviedb.org/3/';

// Fetch available genres from TMDb
async function fetchGenres() {
    const response = await fetch(`${tmdbBaseUrl}genre/movie/list?api_key=${apiKey}`);
    const data = await response.json();
    const genreSelect = document.getElementById('genre');
    
    data.genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

// Fetch movies based on filters
async function findMovies() {
    const genre = document.getElementById('genre').value;
    const type = document.getElementById('type').value;
    const mood = document.getElementById('mood').value;
    const rating = document.getElementById('rating').value;

    let url = `${tmdbBaseUrl}discover/movie?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`;

    if (type === 'tv') {
        url = `${tmdbBaseUrl}discover/tv?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    displayMovies(data.results);

    // Save the user's selection to Firebase
    saveUserPreferences(genre, type, mood, rating);
}

// Display movies
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    if (movies.length === 0) {
        movieList.innerHTML = 'No movies found.';
        return;
    }

    movies.forEach(movie => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${movie.title || movie.name}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <p>${movie.overview}</p>
        `;
        movieList.appendChild(div);
    });
}

// Save user preferences to Firebase
function saveUserPreferences(genre, type, mood, rating) {
    const preferencesRef = ref(database, 'userPreferences');
    push(preferencesRef, {
        genre: genre,
        type: type,
        mood: mood,
        rating: rating
    }).then(() => {
        console.log('Preferences saved successfully!');
    }).catch((error) => {
        console.error('Error saving preferences:', error);
    });
}

// Initialize the app and load genres
fetchGenres();
