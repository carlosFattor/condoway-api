const group = require('../enum/groups');

module.exports = function(app){

    app.get('/v1/group/users', function(req, res){
        res.json(group);
    });
}