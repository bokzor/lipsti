head.js(
    'cordova.js',
    'cdv-plugin-fb-connect.js',
    'facebook-js-sdk.js',
    'js/mobile/libs/jquery.js',
    'js/mobile/libs/snap.js',
    'js/mobile/libs/prefixfree.js',
    'js/mobile/libs/underscore.js',
    'js/mobile/libs/backbone.js',
    'js/mobile/libs/fastclick.js',
    'js/mobile/libs/detect.js',
    'js/mobile/libs/jquery.tagsinput.js',
    'js/mobile/libs/typeahead.bundle.min.js',
    'js/mobile/libs/crop.js',
    'js/mobile/libs/sha512.js',

    'js/mobile/app.js',

    'js/mobile/app/models/models.js',
    'js/mobile/app/models/user.js',
    'js/mobile/app/models/commande.js',
    'js/mobile/app/models/article.js',
    'js/mobile/app/models/cat.js',
    'js/mobile/app/models/size.js',
    'js/mobile/app/models/city.js',
    'js/mobile/app/models/region.js',


    'js/mobile/app/views/header.js',
    'js/mobile/app/views/addArticle.js',
    'js/mobile/app/views/crop.js',
    'js/mobile/app/views/infiniteArticle.js',
    'js/mobile/app/views/snap.js',
    'js/mobile/app/views/app.js',
    'js/mobile/app/views/login.js',
    'js/mobile/app/routes/routes.js'

);

head.ready(function() {
    function checkConnection() {
        // var networkState = navigator.connection.type;
        //if (networkState === 'Connection.NONE') {
        //   alert('Merci de vous connecter au Wifi');
        //}
    }

    $(window).ready(function() {


        document.addEventListener('deviceready', function() {
            console.log('device ready');
            // padding top 20 px for ios
            if (parseFloat(window.device.version) >= 7.0) {
                document.body.style.marginTop = "20px";
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
    })
});