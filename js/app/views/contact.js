app.Views.contactOption = Backbone.View.extend({
    id: 'contactContainer',
    template: _.template($('#contactOption').html()),
    templateForm: _.template($('#contactForm').html()),
    events: {
        'click #displayForm': 'form',
        'click #annulerOption': 'annuler'
    },
    render: function() {
        this.$el.html(this.template());
        $('body').append(this.$el);
        this.rendered = true;

        // on desactive le scroll;
        $('#scroller').css('overflow', 'hidden');
    },
    initialize: function(options) {
        this.options = options || {};
        this.render();
    },
    form: function() {
        this.$el.html(this.templateForm());
    },
    annuler: function() {
        $('article').animate({
            opacity: 1
        }, 400);

        this.rendered = false;
        //this.options.slide.kill();
        //Remove view from DOM
        this.remove();

        // on active le scroll;
        $('#scroller').css('overflow', 'auto');

    }


});