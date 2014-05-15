app.Views.addArticle = Backbone.View.extend({
    template: _.template($('#addArticleTemplate').html()),
    render: function() {
        this.$el.html(this.template({
            sizes: this.size,
            cats: this.cat
        }));
        this.$('#tags').tagsInput({
            'defaultText': 'Tags',
        });
    },
    events: {
        "click .addPhoto": "addPhoto",
        "click #valider-article": "valider",
    },
    initialize: function() {
        this.cat = app.collections.cat;
        this.size = app.collections.size;


        this.listenToOnce(this.size, 'add', this.render);
        this.listenToOnce(this.cat, 'add', this.render);

        this.render();
    },
    addPhoto: function(e) {
        this.idPhoto = $(e.currentTarget).data("photo-id");
        try {
            var that = this;
            navigator.camera.getPicture(function(urlImg) {
                    var crop = new app.Views.crop({
                        url: 'data:image/jpeg;base64,' + urlImg,
                        idPhoto: that.idPhoto
                    })
                },
                function() {
                    $('#photo-' + that.id).val('');
                    $('#b-photo-' + that.id).text('Photo ' + that.id);
                }, {
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.DATA_URL,
                    allowEdit: false,
                    sourceType: 2
                });
        } catch (e) {
            console.log(e);
            var crop = new app.Views.crop({
                url: './one.jpg',
                idPhoto: that.idPhoto,
            })
        }
    },
    valider: function() {
        var that = this;
        $.ajax({
            url: app.config.url + '/add',
            type: "POST",
            data: {
                mark: that.$('#mark').val(),
                price: that.$('#price').val(),
                cpInput: that.$('#cpInput').val(),
                description: that.$('#description').val(),
                tags: that.$('#tags').val(),
                sizeInput: that.$('#sizeInput').val(),
                catInput: that.$('#catInput').val(),
                genreInput: that.$('#genreInput').val(),
                file1input: that.$('#file1input').val(),
                file2input: that.$('#file2input').val(),
                file3input: that.$('#file3input').val(),
                file4input: that.$('#file4input').val(),
                markInput: 0,
                shippingInput: 0,
                favcolor: '#000000',


            },
            success: function(result) {
                navigator.notification.alert('Votre article a été ajouté !');

            },
            error: function(error) {
                console.log(error);
                navigator.notification.alert('Une erreur s\'est produite');
            }
        });
    }

});