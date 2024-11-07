// Fetching genres for the dropdown
document.addEventListener('DOMContentLoaded', () => {
    // Load preferences from localStorage if any
    loadPreferences();

    // Fetch genres from the backend
    fetch('http://localhost:3000/api/genres')
        .then(response => response.json())
        .then(data => {
            const genreSelect = document.getElementById('genre');
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching genres:', error);
        });
});

// Function to save user preferences to localStorage
function savePreferences() {
    const genre = document.getElementById('genre').value;
    const type = document.getElementById('type').value;
    const mood = document.getElementById('mood').value;
    const rating = document.getElementById('rating').value;

    const preferences = { genre, type, mood, rating };

    // Save preferences to localStorage
    localStorage.setItem('moviePreferences', JSON.stringify(preferences));

    console.log("Preferences saved:", preferences);
}

// Function to load saved preferences from localStorage
function loadPreferences() {
    const savedPreferences = localStorage.getItem('moviePreferences');
    
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);

        // Set the saved preferences in the form fields
        document.getElementById('genre').value = preferences.genre || '';
        document.getElementById('type').value = preferences.type || 'movie';
        document.getElementById('mood').value = preferences.mood || '';
        document.getElementById('rating').value = preferences.rating || '1';
    }
}

// Function to fetch movies based on filters
function findMovies() {
    const genre = document.getElementById('genre').value;
    const type = document.getElementById('type').value;
    const mood = document.getElementById('mood').value;
    const rating = document.getElementById('rating').value;

    // Save the preferences when the button is clicked
    savePreferences();

    if (!genre || !rating) {
        alert('Please select a genre and rating!');
        return;
    }

    const url = `http://localhost:3000/api/movies?genre=${genre}&rating=${rating}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

// Function to display the fetched movies
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear the previous list

    if (movies.length === 0) {
        movieList.innerHTML = '<p>No movies found. Try different filters.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p><strong>Rating:</strong> ${movie.vote_average} ⭐</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
        `;
        movieList.appendChild(movieDiv);
    });
}
