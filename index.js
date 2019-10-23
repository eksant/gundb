/** express */
// const express = require('express');
// const Gun = require('gun');
// require('gun/sea');

// const port = process.env.PORT || 8765;
// const app = express();
// app.use(Gun.serve);
// app.use(express.static(__dirname));

// var server = app.listen(port);
// var gun = Gun({ file: 'data', web: server });

// global.Gun = Gun;
// global.gun = gun;

// console.log('Server started on port ' + port + ' with /gun');

/** http */
const fs = require('fs');
const Gun = require('gun');
const cluster = require('cluster');
require('gun/sea');

if (cluster.isMaster) {
  return (
    cluster.fork() &&
    cluster.on('exit', function() {
      cluster.fork();
    })
  );
}

var config = { port: process.env.PORT || 8765 };
if (process.env.HTTPS_KEY) {
  config.key = fs.readFileSync(process.env.HTTPS_KEY);
  config.cert = fs.readFileSync(process.env.HTTPS_CERT);
  config.server = require('https').createServer(config, Gun.serve(__dirname));
} else {
  config.server = require('http').createServer(Gun.serve(__dirname));
}

const gun = Gun({ file: 'data', web: config.server.listen(config.port) });
global.Gun = Gun;
global.gun = gun;
console.log('Relay peer started on port ' + config.port + ' with /gun');
