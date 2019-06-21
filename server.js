const express = require('express');

const server = express();

// const hubsRouter = require('./hubs/hubs-router.js'); // add this line after requiring express

server.use(express.json());
// server.use('/api/hubs', hubsRouter); // add this line to use the router

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h2>
      <p>Welcome to the Lambda Posts API</p>
    `);
  });



module.exports = server;
// this is equivalent to: export default server;