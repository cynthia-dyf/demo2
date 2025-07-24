const http = require('http');
const date = {
    name: "node.js",
    type: "runtime",
    languahe: "javascript",
}

const server = http.createServer((rep, res) => {
    if(rep.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(date));
    } else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});




//aip_server  
