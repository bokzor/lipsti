app.Views.SnapView = Backbone.View.extend({
    className: 'snap-drawers',
    render: function() {

    },
    initialize: function() {
        console.log('new snap');
        // on cree une reference pour le snap droit et gauche
        // this.snapRight = new app.Views.SnapRightView();
        this.snapLeft = new app.Views.SnapLeftView({
            model: this.model
        });
        this.snapRight = new app.Views.SnapRightView();
        // on ajouter le html du snap droit et gauche a la vue snap
        this.$el.html(this.snapLeft.el).append(this.snapRight.el);
        // on place le html apres l'id content
        $('#content').after(this.el);


        // app.snapper.settings({
        //   disable: 'right'
        //});

    },
    remove: function() {
        console.log('remove snap');
        this.snapRight.remove();
        this.snapLeft.remove();
    }

})

// le snap menu gauche
app.Views.SnapLeftView = Backbone.View.extend({
    className: 'snap-drawer snap-drawer-left',
    id: 'left-drawer',
    events: {
        "click #accueil": "accueil",
        'click #add-article': 'addArticle',
        'click #login': 'login',
        'click #logout': 'logout',
        'click #filter': 'filter',
    },
    initialize: function(options) {
        this.options = options || {};
        this.model = this.options.model;
        var that = this;

        // ouvre/ferme panel lors du click
        $(document).on('click', '#toggle-left', function() {
            var data = app.snapper.state();
            app.snapper.disable('left');
            if (data['state'] !== 'closed') {
                app.snapper.close();
                $('body').removeClass('snapjs-left');
            } else {
                app.snapper.open('left');
            }
        });

        this.model.on('change', function() {
            that.render();
        })

        this.render();

        return this;
    },
    render: function() {

        if (this.model.get('logged') == false) {
            this.$el.html(_.template($('#menuTemplate').html(), {
                logged: this.model.get('logged'),
                sizes: this.size,
                cats: this.cat,
                regions: this.region
            }));
        } else {
            this.$el.html(_.template($('#profileTemplate').html(), {
                avatar: app.config.url + '/upload/' + app.user.get('avatar'),
                username: app.user.get('username'),
            }) + _.template($('#menuTemplate').html(), {
                logged: app.user.get('avatar'),

            }));
        }

    },

    logout: function() {
        app.user.logout();
    },

    login: function() {
        app.routes.navigate('login', {
            trigger: true,
            replace: true
        });
        app.snapper.close();
    },
    addArticle: function() {
        console.log('addArticle');
        app.routes.navigate('addArticle', {
            trigger: true,
            replace: true
        });
        app.snapper.close();
    },
    accueil: function() {
        app.routes.navigate('', {
            trigger: true,
            replace: true
        });
        app.snapper.close();
    },


});


//le snap filtrer a droite
app.Views.SnapRightView = Backbone.View.extend({
    className: 'snap-drawer snap-drawer-right',
    id: 'right-drawer',
    events: {
        'click #filter': 'filter',
    },
    filtreTemplate: _.template($('#filtreTemplate').html()),
    initialize: function() {
        $(document).on('click', '#toggle-right', function() {
            var data = app.snapper.state();
            if (data['state'] !== 'closed') {
                app.snapper.close();
            } else {
                app.snapper.open('right');
            }
        });
        // on set les valeurs pour les forms de tris
        this.cat = app.collections.cat;
        this.size = app.collections.size;
        this.region = app.collections.region;

        this.listenToOnce(this.region, 'add', this.render);
        this.listenToOnce(this.size, 'add', this.render);
        this.listenToOnce(this.cat, 'add', this.render);

        this.render();

        return this;
    },
    render: function() {
        var template = this.filtreTemplate({
            sizes: this.size,
            cats: this.cat,
            regions: this.region
        });

        $(this.el).html(template);

    },
    filter: function() {
        console.log('on filtre');
        app.views.app.content.collection.cat = $('#catSelect').val();
        app.views.app.content.collection.genre = $('#genreSelect').val();
        app.views.app.content.collection.size = $('#sizeSelect').val();
        app.views.app.content.collection.prix = $('#prixSelect').val();
        app.views.app.content.collection.region = $('#regionSelect').val();
        $('#scroller ul').remove();
        app.routes.navigate('', {
            trigger: true,
            replace: true
        });
        app.views.app.content.render();
        app.snapper.close();

    },
});