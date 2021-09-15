const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const {verificaToken,verificaAdminRole} = require('../middlewares/autorizacion')
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', verificaToken, async function(req, res){
    
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 1000;
    limite = Number(limite);

    let estadoActivo = {
        estado: true
    };

    try {
        
        const usuarios = await Usuario.findAll({
            attributes: ['nombre', 'email'],
            where: estadoActivo,
            offset: desde,
            limit: limite
        });

        const cuantos = await Usuario.count({
            where: estadoActivo
        });

        return res.json({
                ok: true,
                usuarios,
                cuantos
            });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
});

app.post('/usuario', [verificaToken,verificaAdminRole], async function(req, res){
    let body = req.body;
    console.log(body);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    try {

        const usuarioDB = await usuario.save();
        
        res.json({
            ok: true,
            usuario: usuarioDB
        });
        
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
    

});

app.put('/usuario/:id', [verificaToken,verificaAdminRole], async function(req, res){
    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    try {
        const usuarioDB = await Usuario.update(
            body,
            {where: {
                id
            }}
        );

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
});

app.delete('/usuario/:id', [verificaToken,verificaAdminRole], async function(req,res){

    let id = req.params.id;

    try {
        
        //Delete logico
        const usuarioBorrado = await Usuario.update(
            {estado: false},
            {where: {
                id
            }}
        );

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
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
});

module.exports = app;