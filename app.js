<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ayang's Personal Movie Picker!!</title>
    <link rel="stylesheet" href="styles.css">
    <script type="module" src="app.js"></script> <!-- Only this script tag is necessary -->
</head>
<body>
    <div class="container">
        <h1>Ayang's Personal Movie/Series Picker!!</h1>
        <div class="filters">
            <label for="genre">Genre:</label>
            <select id="genre"></select>

            <label for="type">Type:</label>
            <select id="type">
                <option value="movie">Movie</option>
                <option value="tv">TV Series</option>
            </select>

            <label for="mood">Mood:</label>
            <select id="mood">
                <option value="">Select Mood</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="adventure">Adventure</option>
                <option value="thriller">Thriller</option>
                <option value="romantic">Romantic</option>
                <option value="chill">Chill</option>
            </select>

            <label for="rating">Rating:</label>
            <select id="rating">
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>

            <button onclick="findMovies()">Find Movies</button>
        </div>

        <div id="movie-list"></div>
    </div>

    <script src="app.js"></script>
</body>
</html>
