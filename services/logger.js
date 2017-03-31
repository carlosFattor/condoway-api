var winston = require('winston');
var fs = require('fs');

if(!fs.existsSync('logs')){
    fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/condoway-info.log',
            maxSize: 10000,
            maxFiles: 10
        },
        {
            level: 'warning',
            filename: 'logs/condoway-warning.log',
            maxSize: 10000,
            maxFiles: 10
        },
        {
            level: 'error',
            filename: 'logs/condoway-error.log',
            maxSize: 10000,
            maxFiles: 10
        })
    ]
});