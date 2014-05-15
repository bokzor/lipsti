app.Collections.region = Backbone.Collection.extend({
    url: function() {
        return app.config.url + '/api/getRegion';
    },
});