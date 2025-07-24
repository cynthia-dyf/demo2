//app.js
// 1. import the http moudle
const http = require('http');
// 5. connect html page with node,js
const path = require('path');

const fs = require('fs');

// 8. read the file
// 2. create http server
const server = http.createServer((req, res) =>
{
    // 6. connect path
    const filePath = path.join(__dirname, 'index.html');    
    
    fs.readFile(filePath,  (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
        
    
    });
  
});

// 3. start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});


