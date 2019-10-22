const Gun = require('gun');
const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

const host = process.env.HOST || 'localhost';
const port = 7881;
app.use(
  bodyParser.json({
    strict: false,
  })
);
app.use(cors());
app.use(Gun.serve);

const gun = Gun({ file: 'db', web: server });
const user = gun.user();
// user.create('root', 'password', ack => {
//   console.log('==ack', ack);
// });

// user.auth('root', 'password', ack => {
//   if (ack && ack.err) return new Error(ack.err);
//   // console.log('==ack', ack);
// });

// function login(ack) {
//   console.log('login..');
//   user.auth('bob', 'unsafepassword', write);
// }

// const users = gun.get('users');
// console.log('==users', users);

// global.Gun = Gun;
// global.gun = gun;
server.listen(port);
console.log(`Database server started in ${host}:${port}`);
