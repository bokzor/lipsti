app.Views.crop = Backbone.View.extend({
    id: 'cropContainer',
    template: _.template($('#cropImage').html()),
    events: {
        'click #validerCrop': 'valider',
        'click #annulerCrop': 'annuler'
    },
    render: function() {
        this.$el.html(this.template());
        $('body').append(this.$el);
        this.one = new CROP();
        this.one.init('.cropDefault');
        // load image into crop
        this.one.loadImg(this.options.url);
    },
    initialize: function(options) {
        this.options = options || {};
        this.render();
    },
    valider: function() {
        var that = this;
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
            url: app.config.url + '/imgPicker/api',
            type: "POST",
            data: {
                image: coordinates(this.one).image,
                action: 'save',
                type: 'background',
                width: coordinates(this.one).w,
                height: coordinates(this.one).h,
                x: coordinates(this.one).x,
                y: coordinates(this.one).y

            },
            success: function(result) {
                var result = $.parseJSON(result);
                var splits = result.data.split('/');
                $('#b-photo-' + that.options.idPhoto).text('✓');
                $('#file' + that.options.idPhoto + 'input').val(splits[splits.length - 1]);
            },
            error: function(error) {
                console.log(error);
                alert('Echec lors de l\'upload de la photo');
            }
        });

        this.remove();
    },
    annuler: function() {
        this.remove();
    }


});