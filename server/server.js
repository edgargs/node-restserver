require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/usuario', function(req, res){
    res.json("Hello World");
});

app.post('/usuario', function(req, res){
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "Nombre undefinend"
        });
    } else {
        res.json({
            persona: body
        });
    }
});

app.put('/usuario/:id', function(req, res){
    let id = req.params.id;
    res.json("Hello World");
});


app.listen(process.env.PORT);