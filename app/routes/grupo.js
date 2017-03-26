module.exports = function(app) {
    var api = app.api.grupo;
    app.get('/v1/grupo', api.lista);
}