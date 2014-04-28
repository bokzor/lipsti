app.Models.user = Backbone.Model.extend({
    url: app.config.url + '/rest/user.json',
    defaults: {
        logged: false,
        statut: 'client',
    },
    initialize: function() {
        this.on("change:logged", this.checkLogin)
    },
    checkLogin: function() {
        app.routes.navigate('', {
            trigger: true,
            replace: true
        });

    },

    logout: function() {
        // on ecoute l'evenement close des slides. Lorsqu'on est sur que celui-ci est fermé.
        // On deconnecte l'utilisateur et on supprime l'application

        var url = app.config.url + '/logout';
        localStorage.removeItem('connect');
        $.ajax({
            type: 'GET',
            url: url,
            complete: function(data, textStatus, request) {
                app.user.set({
                    logged: false
                });
                console.log('action logout');
            },
        });

        app.snapper.close();

    },
    validerLogin: function(username, password) {
        var url = app.config.url + '/api/login/';
        var hash = CryptoJS.SHA512(password).toString();

        $.ajax({
            type: 'POST',
            url: url,
            data: {
                pwd: password,
                login: username
            },
            success: function(data, textStatus, request) {
                console.log(data);
                //var data = $.parseJSON(data);
                if (data.avatat !== undefined) {
                    app.user.set({
                        logged: true,
                        avatar: data.avatat,
                        username: username,
                        id: data.id
                    });
                    localStorage.connect = 'ok';
                    localStorage.username = username;
                    localStorage.password = password
                } else {
                    app.user.set({
                        logged: false
                    });
                    localStorage.removeItem('connect');
                    navigator.notification.alert('Mot de passe incorrect.');

                    return false;

                }
            },
            error: function(request, textStatus, errorThrown) {
                app.user.set({
                    logged: false
                });
                localStorage.removeItem('connect');
                navigator.notification.alert('Mot de passe incorrect.');

                return false;
            }
        });
    },
    loginFacebook: function() {
        FB.login(
            function(response) {
                if (response.authResponse) {
                    FB.api('/me', {
                            fields: 'first_name, last_name, picture.width(600).height(600), email, gender'
                        },
                        function(response) {
                            if (!response.error) {
                                user = response;
                                var accessToken = FB.getAuthResponse()['accessToken'];
                                $.ajax({
                                    data: {
                                        accessToken: accessToken,
                                    },
                                    type: 'POST',
                                    url: app.config.url + '/facebook_auth_test',
                                    success: function(data, textStatus, request) {
                                        var data = $.parseJSON(data);
                                        app.user.set({
                                            logged: true,
                                            avatar: data.avatar,
                                            username: data.username,
                                            email: data.email
                                        });
                                    },
                                });

                            } else {
                                console.log('Error getting user info: ' + JSON.stringify(response.error));
                                // Check for errors due to app being unininstalled
                                if (response.error.error_subcode && response.error.error_subcode == "458") {
                                    setTimeout(function() {
                                        alert("The app was removed. Please log in again.");
                                    }, 0);
                                }
                                this.set({
                                    logged: false
                                });
                                //navigator.notification.alert('Erreur avec la connection facebook.');

                            }
                        });
                }
            }, {
                scope: "email, user_birthday"
            }
        );
    }
});