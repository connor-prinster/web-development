'use strict';

let http = require('http');
let path = require('path');
let fs = require('fs');
let game = require('./scripts/server/game');

let mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
    '.mp3' : 'audio/mpeg3',
    '.ttf' : 'application/x-font-ttf',
    '.eot' : 'application/vnd.ms-fontobject',
    '.map' : 'application/json'
};

function handleRequest(request, response) {
    let lookup = (request.url === '/') ? '/index.html' : decodeURI(request.url);
    let file = lookup.substring(1, lookup.length);

    // console.log(`request: ${request.url}`);
    fs.exists(file, function(exists) {
        if (exists) {
            // console.log(`Trying to send: ${lookup}`);
            fs.readFile(file, function(err, data) {
                let headers = { 'Content-type': mimeTypes[path.extname(lookup)] };

                if (err) {
                    response.writeHead(500);
                    response.end('Server Error!');
                } else {
                    response.writeHead(200, headers);
                    response.end(data);
                }
            });
        } else {
            console.log(`Failed to find/send: ${lookup} `);
            response.writeHead(404);
            response.end();
        }
    });
}

let server = http.createServer(handleRequest);
server.listen(3000, function() {
    game.initialize(server);
    console.log('Server is listening on port 3000');
});
