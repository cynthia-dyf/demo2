import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// settING ON DIRECTORY PATH
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// middleware to serve static files
app.use(express.static(path.join(__dirname, '/public')));

// api endpoint to get a joke
// asyc: wait for a response , only when get response can get into the next step
app.get('/joke', async (req, res) => {
   try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
        const joketext = await response.json();
        // send this joketext into res :final response to the client
        res.json(joketext);


   }catch(error){
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Failed to fetch joke' });

   }
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});