const express = require('express');
const axios = require('axios');
require('dotenv').config();  // This loads environment variables from .env file

const app = express();
const port = 3000;  // Port your backend will run on

const apiKey = process.env.TMDB_API_KEY;  // Use your API key from .env file

// Endpoint to get movie genres
app.get('/api/genres', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        res.json(response.data);  // Send genres as a JSON response
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).send('Error fetching genres');
    }
});

// Endpoint to search for movies by genre and rating
app.get('/api/movies', async (req, res) => {
    const { genre, rating } = req.query;  // Get query params
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`);
        res.json(response.data.results);  // Send the movie results as a JSON response
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
