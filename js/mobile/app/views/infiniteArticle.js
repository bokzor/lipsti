app.Views.infiniteArticle = Backbone.View.extend({
    id: 'scroller',
    initialize: function() {
        // isLoading is a useful flag to make sure we don't send off more than
        // one request at a time
        this.isLoading = false;
        this.collection = new app.Collections.article;
        this.render();
        console.log('initialize');
        this.collection.on('sync', function() {
            console.log('collection fetched');
            try {
                navigator.splashscreen.hide();
            } catch (e) {

            }
        })
    },
    render: function() {
        this.loadResults();
    },
    loadResults: function() {
        var that = this;
        // we are starting a new load of results so set isLoading to true
        this.isLoading = true;
        this.$el.after('<div id="loader-article"></div>');
        // fetch is Backbone.js native function for calling and parsing the collection url
        that.collection.fetch({
            success: function(articles) {
                // Once the results are returned lets populate our template
                $(that.el).append(_.template($('#infiniteArticle').html(), {
                    articles: articles
                }));
                // Now we have finished loading set isLoading back to false
                that.isLoading = false;
                $('#loader-article').remove();
            },
        });
    },
    // This will simply listen for scroll events on the current el
    events: {
        'scroll': 'checkScroll'
    },
    checkScroll: function() {
        var triggerPoint = 600; // 600px from the bottom
        if (!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight) {
            this.collection.page += 1; // Load next page
            this.loadResults();
        }
    }
});