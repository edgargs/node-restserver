require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use( require('./routes/usuario') );

//Connect Mongo
mongoose.connect(process.env.URLDB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    user: 'node-user',
    pass: 'C1b3rt3c@081'
  }, (err, res) => {
    if(err) throw err;

    console.log("BBDD online");
});

app.listen(process.env.PORT);