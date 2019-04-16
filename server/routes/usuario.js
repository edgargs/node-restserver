const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const {verificaToken,verificaAdminRole} = require('../middlewares/autorizacion')
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', verificaToken, function(req, res){
    
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 0;
    limite = Number(limite);

    let estadoActivo = {
        estado: true
    };

    Usuario.find(estadoActivo, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec( (err,usuarios) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments(estadoActivo, (err,cuantos) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos
                });

            });
        });
});

app.post('/usuario', [verificaToken,verificaAdminRole], function(req, res){
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', [verificaToken,verificaAdminRole], function(req, res){
    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{new: true, runValidators: true},(err,usuarioDB)=>{
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', [verificaToken,verificaAdminRole], function(req,res){

    let id = req.params.id;

    //Usuario.findByIdAndRemove(id,(err, usuarioBorrado)=>{
    Usuario.findByIdAndUpdate(id,{estado: false},(err, usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;