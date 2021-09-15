const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login', async (req,res)=>{

    let body = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne({
            where: {email: body.email}
        });
        
        if(!usuarioDB){
            return res.status(400).json({
                ok: false
            });
        }

        console.log(bcrypt.hashSync(body.password,10));

        if (!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(402).json({
                ok: false
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        },process.env.SEED,{ expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });

    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }

});

module.exports = app;