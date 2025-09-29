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
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on HOST:${HOST}, PORT:${PORT}`);
});