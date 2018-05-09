const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;// port in which our server runs(localhost:3000)

const server = http.createServer(app);//server creater

server.listen(port);//if any request some to this (3000) port the server will start
