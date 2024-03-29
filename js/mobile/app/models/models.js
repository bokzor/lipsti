app.Models.article = Backbone.Model.extend({
    defaults: {},
});

app.Collections.articles = Backbone.Collection.extend({
    model: app.Models.article,
    comparator: 'name',
    url: app.config.url + '/rest/article.json',
    recherche: function(query) {
        app.views.articles.attributes['recherche'] = query;
        app.views.articles.attributes['cat_id'] = 0;
        app.views.articles.recherche();
    }
});

app.Models.category = Backbone.Model.extend({
    defaults: {},

});



app.Collections.categories = Backbone.Collection.extend({
    model: app.Models.category,
    url: app.config.url + '/rest/category.json',
    initialize: function() {
        this.on('sync', function() {
            app.views.cats.render();
            console.log('catégorie chargée');
        });
    }
});


app.Models.infos = Backbone.Model.extend({
    defaults: {
        tableId: -1,
        commandeId: -1,
        bancontact: 0,
        cash: 0,
        statutId: 0,
    },
    initialize: function() {
        this.on('change', this.barreAction);
    },
    changeTable: function() {
        app.views.app.changeTable(this.tableId);
    },
    annuler: function() {
        app.collections.commande.reset();
        if (typeof(app.views.popup) === 'object') {
            app.views.popup.remove();
        }
        app.snapper.close();
        //this.clear().set(this.defaults);
        this.set({
            commandeId: -1,
            bancontact: 0,
            cash: 0,
            statutId: 0
        });
    },
    barreAction: function() {
        if (this.hasChanged("commandeId")) {
            app.views.barreAction.render();
            console.log('change commandeId');
        }
    }
});