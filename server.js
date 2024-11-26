const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');  // Importing CORS for enabling cross-origin requests

const app = express();
const port = 3000;
const apiKey = process.env.TMDB_API_KEY;

app.use(cors()); // Enable all CORS requests

app.get('/api/genres', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        console.log('Fetched Genres:', response.data);  // Log the entire response
        res.json(response.data);  // Send genres to the frontend
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).send('Error fetching genres');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
