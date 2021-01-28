const express = require('express');
const server = express();

const APP_PATH = __dirname + '/app/';

server.use(express.static(APP_PATH));

server.get('/', (req, res) => {
  res.sendFile(APP_PATH + 'index.html');
});

const { curly } = require('node-libcurl');

server.get('/api/google', async (req, res) => {
  const { statusCode, data, headers } = await curly.get('http://www.google.com');
  res.json(data);
});

server.listen(8080);