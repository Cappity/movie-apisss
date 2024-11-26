const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');  // Importing CORS for enabling cross-origin requests

const app = express();
const port = 3000;  // Port where the backend is running
const apiKey = process.env.TMDB_API_KEY;  // Fetch your API key from .env

app.use(cors()); // Enable all CORS requests (for local testing)

app.get('/api/genres', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        console.log('Fetched Genres:', response.data);  // Log the fetched genres for debugging
        res.json(response.data);  // Send genres to frontend
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).send('Error fetching genres');
    }
});

app.get('/api/movies', async (req, res) => {
    const { genre, rating } = req.query;
    console.log(`Received request for genre: ${genre}, rating: ${rating}`);

    if (!genre || !rating) {
        return res.status(400).send('Genre and rating are required');
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&vote_average.gte=${rating}`);
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
