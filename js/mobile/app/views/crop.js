app.Views.crop = Backbone.View.extend({
    id: 'cropDefault',
    template: _.template($('#cropImage').html()),
    events: {
        'click #validerCrop': 'valider',
        'click #annulerCrop': 'annuler'
    },
    render: function() {
        this.$el.html(this.template());
        $('body').append(this.$el);
        this.one = new CROP();
        this.one.init('#cropDefault');
        // load image into crop
        this.one.loadImg(this.options.url);
    },
    initialize: function(options) {
        this.options = options || {};
        this.render();
    },
    valider: function() {
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        console.log(percentComplete);
                        if (percentComplete === 100) {

                        }
                    }
                }, false);

                return xhr;
            },
            url: 'http://dress.dev.cblue.be/Lipsti_Base/yiertgklzjfhgiuzr/web/app_dev.php/imgPicker/api',
            type: "POST",
            data: {
                image: coordinates(this.one).image,
                action: 'save',
                type: 'background',
                width: w,
                height: y,
                x: coordinates(this.one).x,
                y: coordinates(this.one).y

            },
            success: function(result) {
                console.log(result);
            },
            error: function(error) {
                alert('Echec lors de l\'upload de la photo');
            }
        });
        console.log(coordinates(this.one));


        this.remove();
    },
    annuler: function() {
        this.remove();
    }


});