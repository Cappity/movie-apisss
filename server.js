const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Loads environment variables from .env file
const cors = require('cors'); // Importing cors to handle CORS issues

const app = express();
const port = 3000;  // Port the backend will run on

const apiKey = process.env.TMDB_API_KEY;  // Use your API key from .env file

// Enable CORS to allow the frontend to fetch data
app.use(cors());

// Endpoint to get movie genres
app.get('/api/genres', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        console.log('Fetched Genres:', response.data);  // Log the response for debugging
        res.json(response.data);  // Send genres as a JSON response
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).send('Error fetching genres');
    }
});

// Endpoint to search for movies by genre and rating
app.get('/api/movies', async (req, res) => {
    const { genre, rating } = req.query;  // Get query params
    console.log(`Received request for genre: ${genre}, rating: ${rating}`);  // Log the incoming query parameters

    // Validate parameters
    if (!genre || !rating) {
        return res.status(400).send('Genre and rating are required');
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`);
        console.log('Fetched Movies:', response.data.results);  // Log the movie data for debugging
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
