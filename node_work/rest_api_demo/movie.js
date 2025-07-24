const express =  require('express');
const app = express();
const port = 3000;

// data
let movies = [
    { id: 1, name: 'Alice movie', year: 2020 },
    { id: 2, name: 'Bob movie', year: 2021 }, 
    { id: 3, name: 'Charlie movie', year: 2022 }   
];

// middleware to parse JSON bodies
app.use(express.json());
path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/movie.html')); // Serves the index.html file
});
// get endpoint to retrieve all users
app.get('/movies', (req, res) => {

    res.json(movies); // Sends the `users` array as a JSON response
});

// get endpoint to retrieve all users
app.post('/movies', (req, res) => {
    const newMovie = req.body; // Extracts the new user data from the request body
    newMovie.id = movies.length + 1;
    movies.push(newMovie); // Adds the new user to the `users` array
    res.status(201).json(newMovie); // Sends the newly created user as a JSON response   
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});