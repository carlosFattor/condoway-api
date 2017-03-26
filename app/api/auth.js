const mongoose = require('mongoose');
const model = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const logger = require('../../services/logger.js');
const api = {}

module.exports = function (app) {

    api.userAdd = function (req, res) {
        let user = req.body;
        model
            .create(user)
            .then(function (user) {
                logger.info('new User = '+JSON.stringify(user));
                res.sendStatus(400);
            }, function (error) {
                logger.error('Error trying create new user' + JSON.stringify(error));
                res.status(500).json(error);
            });
    }

    api.autenticar = function (req, res) {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();

        const errors = req.validationErrors();

        if (errors) {

            res.sendStatus(401);
            return;
        }

        model
            .findOne({ email: req.body.email })
            .then(function (user) {
                if (!user) {
                    console.log('LOGIN e/ou senha inválidos');
                    res.sendStatus(401);
                    return;
                } else {

                    user.comparePassword(req.body.password, function (teste) {
                        let token = jwt.sign({ login: user._id }, app.get('secret'), { expiresIn: 84600 });

                        res.set('x-access-token', token);
                        res.end();
                    });

                }
            }, function (error) {
                console.log('Login e/ou senha inválidos');
                res.sendStatus(401);
                return;
            });

    };

    api.verificarToken = function (req, res) {
        let token = req.headers['x-access-token'];
        console.log('Verificando token');

        if (token) {
            jwt.verify(token, app.get('secret'), function (error, decoded) {
                if (error) {
                    console.log('Token rejeitado');
                    res.sendStatus(401);
                }
                req.user = decoded;
                next();
            });
        } else {
            console.log('Token rejeitado');
            res.sendStatus(401);
        }
    }

    return api;
}