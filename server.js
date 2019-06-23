const express = require('express');

const server = express();

const actionsRouter = require('./actions/actions-router'); // add this line after requiring express

server.use(express.json());
server.use('./actions', actions-router); // add this line to use the router

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h2>
      <p>Welcome to the Lambda Posts API</p>
    `);
  });



module.exports = server;
// this is equivalent to: export default server;