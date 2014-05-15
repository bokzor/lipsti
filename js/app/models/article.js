app.Collections.article = Backbone.Collection.extend({
    url: function() {
        return app.config.url + '/api/list/' + this.page + '/' + this.cat + '/' + this.genre + '/' + this.size + '/' + this.prix + '/' + this.region
    },
    page: 0,
    cat: 0,
    genre: 0,
    size: 0,
    prix: 0,
    region: 0,
});