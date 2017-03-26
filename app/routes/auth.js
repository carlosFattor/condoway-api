module.exports = function(app){

    const api = app.api.auth;

    app.post('/autenticar', api.autenticar);
    app.post('/new-user/add', api.userAdd)
    app.use('/v1/*', api.verificarToken);
}