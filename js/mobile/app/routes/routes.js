app.Routes.routeur = Backbone.Router.extend({
    routes: {
        '': 'home',
        'login': 'login',
        'addArticle': 'addArticle'
    },
    home: function() {
        if (localStorage.connect == 'ok') {
            console.log('connect Ok');
            app.user.validerLogin(localStorage.username, localStorage.password);
        }
        if (app.views.app == undefined) {
            app.views.app = new app.Views.App({
                el: $('#content')
            });
        } else {
            console.log(app.views.app);
            app.views.app.render();
        }
    },
    login: function() {
        app.views.login = new app.Views.login({
            el: $('.content')
        })
    },
    addArticle: function() {
        console.log('addArticle route');
        app.views.addArticle = new app.Views.addArticle({
            el: $('.content')
        })
    }

});