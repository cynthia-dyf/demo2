const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n3u3da!',
    database: 'myapp'
});

// Establish DB connection
db.connect((err) => {
    if (err) {
        console.error('DB connection failed:', err);
        return;
    }
    console.log('DB connected successfully');
});

//Middleware
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publicmovie/movie.html')); // Serves the index.html file
});
//app.use(express.static(path.join(__dirname, 'publicmovie')));

// Routes
// get all movies
app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// post a ner movie
app.post('/movies', (req, res) => {
    const {name, year} = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name and year is required' });
    }
    db.query('insert into movies (name) values (?)', [name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.status(201).json({ id: result.insertId, name});
    });
    
});

// update and existing movie = update
app.put('/movie/:id', (req, res) => {
    const id = req.params.id;
    const { name, year } = req.body;
    if (!name || !year) {
        return res.status(400).json({ error: 'Name and year is required' });
    }
    db.query('UPDATE movies SET name = ? WHERE id = ?', [name, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database update failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ id, name});
    });
});

// delete a user
app.delete('/movie/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database delete failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(204).json({ message: 'Movie deleted successfully' });
    });
});

// select a movie by name show all records with that name
app.get('/movie/:name', (req, res) => {
    const name = req.params.name;
    db.query('SELECT * FROM movies WHERE name = ?', [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(results);
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
