app.Views.infiniteArticle = Backbone.View.extend({
    id: 'scroller',
    initialize: function() {
        // isLoading is a useful flag to make sure we don't send off more than
        // one request at a time

        this.isLoading = false;
        this.collection = new app.Collections.article;
        this.render();

        console.log('infinite artocle initialize');
        this.listenToOnce(this.collection, 'sync', function() {
            console.log('collection fetched');
            try {
                navigator.splashscreen.hide();
            } catch (e) {
                console.log(e);
            }
        })
    },
    render: function() {
        this.loadResults();
        FastClick.attach(document.body);

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
        }, {
            cookies: ['PHPSESSID']
        });
    },
    // This will simply listen for scroll events on the current el
    events: {
        'scroll': 'checkScroll',
        'click .like_icon': 'likeArticle',
        'click .activateSlider': 'slide',
    },
    likeArticle: function(e) {
        e.stopPropagation();
        var id = $(e.currentTarget).data('id');
        $(e.currentTarget).toggleClass('liked');
        var url = app.config.url + '/like/' + id;
        $.get(url);
        console.log(url);
    },
    slide: function(e) {
        // on regarde si une vue est déja rendue
        if (this.contactOption != undefined) {
            if (this.contactOption.rendered != false) {
                return false;
            }
        }

        var id = $(e.currentTarget).data('id');

        // on scroll le slide jusqu'au top;
        var toScroll = $('#scroller').scrollTop() + $("#slider-" + id).offset().top - (44 + parseInt($('body').css('padding-top'), 10));
        $('#scroller').animate({
            scrollTop: toScroll
        }, 'slow');

        $('article').not('#article-' + id).animate({
            opacity: 0
        }, 200);

        // on active le slide

        if ($('#slider-' + id).hasClass('activated') == false) {
            console.log('activated');
            try {
                new Swipe(document.getElementById('slider-' + id), {
                    stopPropagation: true,
                });
            } catch (e) {
                console.log(e);
            }

            // on affiche les autres slides et on charge les images
            $(e.currentTarget).parent().find('figure').each(function() {
                $(this).css('display', 'block');
                $(this).find('img').each(function() {
                    var src = $(this).data('src');
                    $(this).attr('src', src);
                });
            });
            $('#slider-' + id).addClass('activated');
        }


        this.contactOption = new app.Views.contactOption({
            slide: this.slide
        });



    },
    checkScroll: function() {
        var triggerPoint = 600; // 600px from the bottom
        if (!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight) {
            this.collection.page += 1; // Load next page
            this.loadResults();
        }
    }
});