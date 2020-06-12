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

const update = (data, queryId, callback) => {
  const nameStr = data.name === undefined ? '' : `name = "${data.name}"`;
  let descStr;
  if (nameStr === '' && data.description !== undefined) {
    descStr = `description = "${data.description}"`;
  } else if (nameStr !== '' && data.description !== undefined) {
    descStr = `, description = "${data.description}"`;
  } else {
    descStr = '';
  }

  const queryStr = `UPDATE cows SET ${nameStr}${descStr} WHERE id = "${queryId}"`;
  connection.query(queryStr, function (err, results) {
    callback(err, results);
  });
};

const deleteRecord = (queryId, callback) => {
  const queryStr = `DELETE FROM cows WHERE id = "${queryId}"`;
  connection.query(queryStr, function (err, results) {
    callback(err, results);
  });
};

app.get('/cows', (req, res) => {
  console.log('app.get ran!');
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
      res.status(201).json(results);
    }
  });
});

app.put('/cows/:id', (req, res) => {
  let queryID = req.params.id;
  update(req.body, queryID, function (err, results) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.delete('/cows/:id', (req, res) => {
  let queryId = req.params.id;
  deleteRecord(queryId, function (err, results) {
    if (err) {
      res.status(404);
    } else {
      res.status(200).send('Deleted!');
    }
  });
});
