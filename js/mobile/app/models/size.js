app.Collections.size = Backbone.Collection.extend({
    url: function() {
        return app.config.url + '/api/getSize'
    },
});