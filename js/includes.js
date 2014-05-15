head.js(
    'cordova.js',
    'cdv-plugin-fb-connect.js',
    'facebook-js-sdk.js',
    'js/libs/jquery.js',
    'js/libs/snap.js',
    'js/libs/prefixfree.js',
    'js/libs/underscore.js',
    'js/libs/backbone.js',
    'js/libs/fastclick.js',
    'js/libs/detect.js',
    'js/libs/jquery.tagsinput.js',
    'js/libs/typeahead.bundle.min.js',
    'js/libs/crop.js',
    'js/libs/cookie.js',
    'js/libs/swipe.js',


    'js/app.js',

    'js/app/models/user.js',
    'js/app/models/article.js',
    'js/app/models/cat.js',
    'js/app/models/size.js',
    'js/app/models/city.js',
    'js/app/models/region.js',


    'js/app/views/header.js',
    'js/app/views/addArticle.js',
    'js/app/views/crop.js',
    'js/app/views/infiniteArticle.js',
    'js/app/views/snap.js',
    'js/app/views/app.js',
    'js/app/views/login.js',
    'js/app/views/contact.js',

    'js/app/routes/routes.js'

);

head.ready(function() {
    function checkConnection() {
        // var networkState = navigator.connection.type;
        //if (networkState === 'Connection.NONE') {
        //   alert('Merci de vous connecter au Wifi');
        //}
    }

    (function() {

        var proxiedSync = Backbone.sync;

        Backbone.sync = function(method, model, options) {
            options || (options = {});
            if (!options.crossDomain) {
                options.crossDomain = true;
            }
            if (!options.xhrFields) {
                options.xhrFields = {
                    withCredentials: true
                };
            }
            return proxiedSync(method, model, options);
        };
    })();

    document.addEventListener('deviceready', function() {
        console.log('device ready');
        // padding top 20 px for ios
        if (parseFloat(window.device.version) >= 7.0) {
            $('body').addClass('ios7');
        }
        app.init()
        FastClick.attach(document.body);


        try {
            FB.init({
                appId: "1444408885775635",
                nativeInterface: CDV.FB,
                useCachedDialogs: false
            });
        } catch (e) {
            console.log(e);
        }

    });

});