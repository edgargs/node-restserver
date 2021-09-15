require('./config/config');

const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { db } = require('./db/connection');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use( require('./routes/index') );

//Connect Postgres
try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(process.env.PORT);

module.exports = app;
