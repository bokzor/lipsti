app.Collections.article = Backbone.Collection.extend({
    url: function() {
        return app.config.url + '/testt.json?page=' + this.page + ''
    },
    // Because twitter doesn't return an array of models by default we need
    // to point Backbone.js at the correct property

    page: 1,
});