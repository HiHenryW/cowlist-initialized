const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// MIDDLEWARE
const morgan = require('morgan'); // helper that collects logs from server
const parser = require('body-parser'); // helper that extracts body of incoming request and exposes it on req.body

app.listen(port, () => console.log(`App is listening on port ${port}!`));
app.use(express.static('./client/dist')); // exposes a directory or a file to a particular URL so its contents can be publicly accessed
app.use(parser.json()); // use the body-parser
app.use(cors()); // deal with preflight cors requests

// CONNECT TO MYSQL
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cowlist',
});

connection.connect();

// SENDING REQUESTS TO THE DATABASE
const getAll = (callback) => {
  const queryStr = 'SELECT id, name, description FROM cows ORDER BY id DESC';
  connection.query(queryStr, function (err, results) {
    callback(err, results);
  });
};

const create = (data, callback) => {
  const queryStr = `INSERT INTO cows(name, description) VALUES ("${data.name}", "${data.description}")`;
  connection.query(queryStr, function (err, results) {
    callback(err, results);
  });
};

app.get('/cows', (req, res) => {
  getAll(function (err, results) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/cows', (req, res) => {
  create(req.body, function (err, results) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(201).send('Successfully added!');
    }
  });
});
