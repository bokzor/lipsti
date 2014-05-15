var app = {
    // Classes
    Collections: {},
    Models: {},
    Views: {},
    Routes: {},
    // Instances
    collections: {},
    models: {},
    views: {},
    routes: {},
    config: {
        protocol: 'http://',
        url: 'http://lipsti.com',
        ip: 'lipsti.com',
    },

    init: function() {
        //document.oncontextmenu = new Function("return false");
        //document.onselectstart = new Function("return false");
        this.routes = new this.Routes.routeur();
        this.user = new this.Models.user();

        this.collections.cat = new this.Collections.cat();
        this.collections.city = new this.Collections.city();
        this.collections.region = new this.Collections.region();
        this.collections.size = new this.Collections.size();

        //on va actualiser les données toutes les semaines //
        this.collections.cat.fetch();
        this.collections.city.fetch();
        this.collections.region.fetch();
        this.collections.size.fetch();
        // fin d'actualisation des données //


        app.routes.navigate('', {
            trigger: true,
            replace: true
        });

        Backbone.history.start();
    }
};