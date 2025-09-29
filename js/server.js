'use strict';
var http = require('http');

import { Utils } from '../modules/utils.js';
import { MESSAGE } from '../lang/messages/en/user.js';
import { FileUtils } from '../modules/fileUtils.js';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Required for Render deployment

const fileUtils = new FileUtils();

http.createServer(async (req, res) => {
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

    if (req.method === 'GET' && url.pathname === '/writeFile/') {
        const text = url.searchParams.get('text');
        await fileUtils.appendToFile(text);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Content written to file.txt');
        return;
    }

    // Handle dynamic file reading: /readFile/filename
    if (req.method === 'GET' && url.pathname.startsWith('/readFile/')) {
        const filename = url.pathname.substring('/readFile/'.length);

        if (!filename) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>400 Bad Request</h1><p>Filename is required</p>');
            return;
        }

        try {
            const content = await fileUtils.readFile(filename);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(content);
        } catch (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<h1>404 File Not Found</h1><p>The file "${filename}" does not exist.</p>`);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1><p>Error reading file</p>');
            }
        }
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
}).listen(PORT, HOST);