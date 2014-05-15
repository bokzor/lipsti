app.Collections.cat = Backbone.Collection.extend({
    url: function() {
        return app.config.url + '/api/getCat';
    },
});