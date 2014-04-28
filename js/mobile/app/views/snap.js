app.Views.SnapView = Backbone.View.extend({
    className: 'snap-drawers',
    render: function() {

    },
    initialize: function() {
        console.log('new snap');
        // on cree une reference pour le snap droit et gauche
        this.snapRight = new app.Views.SnapRightView();
        this.snapLeft = new app.Views.SnapLeftView({
            model: this.model
        });
        // on ajouter le html du snap droit et gauche a la vue snap
        this.$el.html(this.snapRight.el).append(this.snapLeft.el);
        // on place le html apres l'id content
        $('#content').after(this.el);
        app.snapper = new Snap({
            element: document.getElementById('content'),
        });
        if (getMobileWidth() > 599) {
            // app.snapper.disable();
        }

    },
    remove: function() {
        console.log('remove snap');
        this.snapRight.remove();
        this.snapLeft.remove();
    }

})


app.Views.SnapLeftView = Backbone.View.extend({
    className: 'snap-drawer snap-drawer-left',
    id: 'left-drawer',

    events: {
        "click #accueil": "accueil",
        'click #add-article': 'addArticle',
        'click #login': 'login',
        'click #logout': 'logout',

    },
    initialize: function() {
        var that = this;
        $(document).on('click', '#toggle-left', function() {
            var data = app.snapper.state();
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
    },

    render: function() {

        if (this.model.get('logged') == false) {
            this.$el.html(_.template($('#menuTemplate').html(), {
                logged: this.model.get('logged')
            }));
        } else {
            this.$el.html(_.template($('#profileTemplate').html(), {
                avatar: app.config.url + '/upload/' + app.user.get('avatar'),
                username: app.user.get('username'),
            }) + _.template($('#menuTemplate').html(), {
                logged: this.model.get('logged')
            }));
        }

    },
});


app.Views.SnapRightView = Backbone.View.extend({
    className: 'snap-drawer snap-drawer-right',
    id: 'right-drawer',
    initialize: function() {
        $(document).on('click', '#toggle-right', function() {
            var data = app.snapper.state();
            if (data['state'] !== 'closed') {
                app.snapper.close();
            } else {
                app.snapper.open('right');
            }
        });

        this.render();
    },
    render: function() {

    }
});