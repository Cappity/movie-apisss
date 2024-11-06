// Your TMDb API Key
const apiKey = 'YOUR_TMDB_API_KEY';

// Fetching genres for the dropdown
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey)
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

// Function to fetch movies based on filters
function findMovies() {
    const genre = document.getElementById('genre').value;
    const type = document.getElementById('type').value;
    const mood = document.getElementById('mood').value;
    const rating = document.getElementById('rating').value;

    if (!genre || !rating) {
        alert('Please select a genre and rating!');
        return;
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
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
