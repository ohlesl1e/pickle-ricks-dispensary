const express = require('express');
const httpProxy = require('http-proxy');
const server = require('server');

const app = express();
const appServer = server.createServer(app)
const apiProxy = httpProxy.createProxyServer(app);

const wsProxy = httpProxy.createProxyServer({
  target: process.env.WEBSOCKET_HOST || 'http://localhost:6000',
  ws: true,
});

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

wsProxy.on('error', (err, req, socket) => {
  console.log(err);
  console.log('ws failed');
  socket.end();
});

const authHost = process.env.AUTH_HOST || 'http://localhost:3001';
app.all('/api/auth*', (req, res) => {
  apiProxy.web(req, res, { 
    target: authHost
  });
});


const invHost = process.env.INV_HOST || 'http://localhost:3005';
app.all('/api/inventory*', (req, res) => {
  apiProxy.web(req,res, {
    target : invHost,
  });
});

const receiptsHost = process.env.RECEIPTS_HOST || 'http://localhost:3006';
app.all('/api/receipts*', (req, res) => {
  apiProxy.web(req,res ,{
    target: receiptsHost,
  });
});


const uploadHost = process.env.UPLOAD_HOST || 'http://localhost:3002'
app.all('/api/uploadfile', (req, res) => {
  apiProxy.web(req, res, {
    target: uploadHost,
  });
});

const websocketHost = process.env.WEBSOCKET_HOST || 'http://localhost:4000/websocket';
app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: websocketHost });
});

appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  wsProxy.ws(req, socket, head);
});

const fronEndHost = process.env.FRONT_END_HOST || 'http://localhost:3000';
console.log(`Front end proxies to: ${fronEndHost}`);
app.all('/*', (req, res) => {
  // for frontend
  apiProxy.web(req, res, { target: fronEndHost });
});

app.listen(4000)