module.exports = function(app){
    var api = app.api.users;
    
    app.route('/v1/users')
        .get(api.lista)
        .post(api.adicionar);

    app.route('/v1/users/:id')
        .get(api.busca)
        .delete(api.removeProId)
        .put(api.atualiza);
}