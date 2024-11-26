<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Finder</title>
</head>
<body>
    <h1>Find Movies</h1>

    <!-- Form to filter movies -->
    <form id="movie-form">
        <label for="genre">Genre:</label>
        <select id="genre">
            <option value="">Select Genre</option>
        </select>

        <label for="type">Type:</label>
        <select id="type">
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
        </select>

        <label for="mood">Mood:</label>
        <input type="text" id="mood" placeholder="Enter mood (optional)">

        <label for="rating">Rating:</label>
        <select id="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <button type="button" onclick="findMovies()">Find Movies</button>
    </form>

    <h2>Movie List</h2>
    <div id="movie-list"></div>

    <script>
        // Fetch genres for the dropdown
        document.addEventListener('DOMContentLoaded', () => {
            // Load preferences from localStorage if any
            loadPreferences();

            // Fetch genres from the backend
            fetch('http://localhost:3000/api/genres')
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched Genres:', data); // Log the response to check
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
                console.log('Loaded Preferences:', preferences);  // Log preferences to check

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

            const url = http://localhost:3000/api/movies?genre=${genre}&rating=${rating};

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
                movieDiv.innerHTML = 
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                    <p><strong>Rating:</strong> ${movie.vote_average} ⭐</p>
                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                ;
                movieList.appendChild(movieDiv);
            });
        }
    </script>
</body>
</html>
