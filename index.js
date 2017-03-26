const app = require('./config/custom-express')();
const mongoose = require('./config/database');

mongoose('localhost/alurapic');

app.listen(3000, function(){
    console.log("Server runing in PORT:3000");
});