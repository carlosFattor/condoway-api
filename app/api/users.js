const api = {};
const mongoose = require('mongoose');
const model = mongoose.model('User');

api.lista = function (req, res) {
    //Promisse
    model
        .find({})
        .then(function (user) {
            res.json(user);
        }, function (error) {
            res.status(500).json(error);
        });
};

api.busca = function (req, res) {
    model
        .findById(req.params.id)
        .then(function (user) {
            if (!user) throw Error('User not found');

            res.json(user)
        }, function (error) {
            console.log(error);
            res.status(404).json(error);
        });
};

api.removeProId = function (req, res) {
    model
        .remove({ _id: req.params.id })
        .then(function () {
            res.sendStatus(204);
        }, function (error) {
            console.log(error);
            res.status(404).json(error);
        });
}

api.adicionar = function (req, res) {
    let user = req.body;
    model
        .create(user)
        .then(function (user) {
            res.json(user);
        }, function (error) {
            console.log(error);
            res.status(500).json(error);
        });
};

api.atualiza = function (req, res) {
    model
        .findByIdAndUpdate(req.params.id, req.body)
        .then(function (user) {
            res.json(user);
        }, function (error) {
            console.log(error);
            res.status(500).json(error);
        })
};

module.exports = api;
