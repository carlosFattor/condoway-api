const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function(URI){

    mongoose.connect('mongodb://' + URI);

    mongoose.connection.on('connected', function(){
        console.log("conected mongoDB");
    });

    mongoose.connection.on('error', function(error){
        console.log(error);
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Disconected from MongoDB");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Closed connection with app ended');
            process.exit(0);
        });
    })
};
