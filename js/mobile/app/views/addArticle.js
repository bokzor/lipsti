app.Views.addArticle = Backbone.View.extend({
    template: _.template($('#addArticleTemplate').html()),
    render: function() {
        this.$el.html(this.template({
            size: this.size,
            cat: this.cat
        }));
        this.$('#tags').tagsInput({
            'defaultText': 'Tags',
        });
        // autocomplete for cp
        /*
        var cities = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('zip'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 5,
            hint: false,
            highlight: true,
            prefetch: {
                url: 'js/cities.json'
            }
        });
        // kicks off the loading/processing of `local` and `prefetch`
        cities.initialize();
        this.$('#city').typeahead(null, {
            name: 'countries',
            displayKey: function(val) {
                return val.zip + ' : ' + val.name;
            },
            source: cities.ttAdapter(),
        });
        this.$('#city').on('typeahead:selected typeahead:autocompleted', function(e, city) {
            $('#cpInput').val(city.id);
        }) */

        // end autocomplete for cp //
    },
    events: {
        "click .addPhoto": "addPhoto",
    },
    initialize: function() {
        this.cat = app.collections.cat;
        this.size = app.collections.size;

        this.size.on('add', this.render);
        this.cat.on('add', this.render);

        this.render();
    },
    addPhoto: function(e) {
        this.id = $(e.currentTarget).data("photo-id");
        try {
            var that = this;
            navigator.camera.getPicture(function(urlImg) {
                    var crop = new app.Views.crop({
                        url: 'data:image/jpeg;base64,' + urlImg
                    })
                    //$('#photo-' + that.id).val('data:image/jpeg;base64,' + base64);
                    $('#b-photo-' + that.id).text('✓');
                },
                function() {
                    $('#photo-' + that.id).val('');
                    $('#b-photo-' + that.id).text('Photo ' + id);
                    console.log(error);
                }, {
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.DATA_URL,
                    allowEdit: true,
                    targetHeight: 480,

                });
        } catch (e) {
            console.log(e);
        }
    },



});