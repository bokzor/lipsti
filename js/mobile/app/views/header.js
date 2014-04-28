app.Views.HeaderView = Backbone.View.extend({
    tagName: 'header',
    id: 'barre-header',
    className: 'snap-content bar-title',
    template: _.template('<button class="button" id="toggle-left"><span class="icon-menu"></span></button><h1 class="title">Lipsti</h1>' +
        ''),
    render: function() {
        console.log('render the Header');
        this.$el.html(this.template({}));
        return this;
    },
    initialize: function() {}
})