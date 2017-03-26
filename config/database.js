const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function(URI){

    mongoose.connect('mongodb://' + URI);

    mongoose.connection.on('connected', function(){
        console.log("conectado mongoDB");
    });

    mongoose.connection.on('error', function(error){
        console.log(error);
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Desconectado do MongoDB");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Conexao fechada com o termino da aplicação');
            process.exit(0);
        });
    })
};
