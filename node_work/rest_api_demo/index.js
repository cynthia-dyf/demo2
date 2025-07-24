const express =  require('express');
const app = express();
const port = 3000;

// data
let users = [
    { id: 1, name: 'Alice' },   
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// middleware to parse JSON bodies
app.use(express.json());
path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // Serves the index.html file
});
// get endpoint to retrieve all users
app.get('/users', (req, res) => {

    res.json(users); // Sends the `users` array as a JSON response
});

// get endpoint to retrieve all users
app.post('/users', (req, res) => {
    const newUser = req.body; // Extracts the new user data from the request body
    newUser.id = users.length + 1;
    users.push(newUser); // Adds the new user to the `users` array
    res.status(201).json(newUser); // Sends the newly created user as a JSON response   
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});