const express = require('express');
const users = require('../app/routes/users');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const compression = require('compression');
const morgan = require('morgan');
const logger = require('../services/logger.js');
const cors = require('cors')

const app = express();

module.exports = function(){

    app.use(morgan('common', {
        stream: {
            write: function(message){
                logger.info('request=> '+ message);
            }
        }
    }));
    app.use(cors());
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(expressStatusMonitor());
    app.use(compression());
    app.use(bodyParser.json());
    app.set('secret', 'GuildaCode');
    
    consign({cwd: 'app'})
        .include('models')
        .then('api')
        .then('routes/auth.js')
        .then('routes')
        .into(app);
    
    return app;
};