app.Views.login = Backbone.View.extend({
    template: _.template($('#loginForm').html()),
    render: function() {
        this.$el.html(this.template());
    },
    initialize: function() {
        this.render();
    },
    events: {
        "click #login-facebook": "loginFacebook",
        "click #valider-login": "validerLogin"
    },
    validerLogin: function(e) {
        var username = this.$el.find('#username').val();
        var password = this.$el.find('#password').val();
        app.user.validerLogin(username, password);
    },
    loginFacebook: function(e) {
        console.log('login with facebook');
        app.user.loginFacebook();
    },




});