//CRUD Web Server
//...........HTTP........SQL
// Create --> POST ---> INSERT
// Retrieve --> GET ---> SELECT
// Update --> PUT ---> UPDATE
// Delete --> DELETE ---> DELETE

require('dotenv').config();

const PORT = 3000;
const { response } = require('express');
const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const { client } = require('./db');
client.connect();

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

server.use('/api', (request, response, next) => {
    console.log("A request was made to /api (this is the middleware).");
    next();
})


server.get('/api', (request, response, next) => {
    console.log("A get request was made to /api");
    response.send({message: "success"});
})

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});

server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
    Number(req.params.first) + Number(req.params.second)
   }</h1>`);
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});