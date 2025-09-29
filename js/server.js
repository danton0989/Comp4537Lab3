import { Utils } from '../modules/utils.js';
import { createServer } from 'http';
import { MESSAGE } from '../lang/messages/en/user.js';


const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Required for Render deployment

const server = createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/getDate/') {
        const name = url.searchParams.get('name');

        if (!name) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<p style="color: red;">Error: Name parameter is required. Use: /getDate?name=YourName</p>');
            return;
        }

        const date = Utils.getDate();
        const message = MESSAGE.replace('%1', name) + `${date}.`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<p style="color: blue;">${message}</p>`);
        return;
    }

    // Handle root path - CRITICAL for Render health checks
    if (req.method === 'GET' && url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>COMP4537 Lab 3 API Server</h1><p>Use: <a href="/getDate?name=John">/getDate?name=John</a></p>');
        return;
    }

    // Handle all other requests
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on HOST:${HOST}, PORT:${PORT}`);
});