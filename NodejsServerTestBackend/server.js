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
  res.json({statusCode, data, headers});
});

server.get('/api/lbry/curl/version', async (req, res) => {
  const { statusCode, data, headers } = await curly.post('http://localhost:5279', {
    postFields: JSON.stringify({ method: "version", params: {} })
  });
  res.json({statusCode, data, headers});
});

server.get('/api/lbry/curl/accountList', async (req, res) => {
  const { statusCode, data, headers } = await curly.post('http://localhost:5279', {
    postFields: JSON.stringify({ method: "account_list", params: {
      "include_claims": false, 
      "show_seed": false,
      "page": 1,
      "page_size": 20
    } })
  });
  res.json({statusCode, data, headers});
});

server.get('/api/lbry/curl/channelList', async (req, res) => {
  console.log("1");
  const { statusCode, data, headers } = await curly.post('http://localhost:5279', {
    postFields: JSON.stringify({ method: "channel_list", params: {
      "name": [], 
      "claim_id": [], 
      "is_spent": false, 
      "resolve": false, 
      "no_totals": false
    } })
  });
  res.json({statusCode, data, headers});
});

const http = require('http');
server.get('/api/lbry/http/version', async (req, res) => {
  const lbryReq = http.request({
    hostname: 'localhost',
    port: 5279,
    method: 'POST'
  }, lbryRes => {
    lbryRes.on('data', data => {
      res.send(data);
    });
  });
  lbryReq.write(JSON.stringify({ method: "version", params: {} }));
  lbryReq.on('error', error => {
    console.error(error)
  });
  lbryReq.end();
});

server.listen(8080);