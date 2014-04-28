app.Views.App = Backbone.View.extend({
    render: function() {
        this.$('.content').html(this.content.el);
        // on reactive les evenements de la vue infiniteArticle
        this.content.delegateEvents();
        return this;
    },
    initialize: function() {

        // on affiche le header
        this.header = new app.Views.HeaderView({
            model: app.infos
        });

        this.$el.prepend(this.header.render().el);

        // on affiche le snap gauche et droit
        this.snap = new app.Views.SnapView({
            model: app.user
        });

        this.content = new app.Views.infiniteArticle();

        this.render();
    },
    delete: function() {
        console.log('app remove');
        app.snapper.disable();
        app.views.login.remove();
        app.views.snap.remove();
    }
})