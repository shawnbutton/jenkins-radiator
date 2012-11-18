JR.RadiatorTitleView = Backbone.View.extend({
    className: "build-health-wrapper row-fluid",
    initialize: function(){
        _.bindAll(this, 'loading');
        this.bind('loading', this.loading);
        _.bindAll(this, 'loaded');
        this.bind('loaded', this.loaded);

        this.render();
    },
    loading: function(){
        LOG.info("Loading...");
        $('#radiator-loading-indicator').show();
    },
    loaded: function(){
        LOG.info("...Loaded");
        $('#radiator-loading-indicator').hide();
    },
    render: function(){
        var template = '<div class="radiator-title-wrapper row-fluid">' +
            '<div class="span12 radiator-title">' +
            '<h1 id="radiatorTitle">{{radiatorTitle}}</h1>' +
            '</div>' +
            '<div id="radiator-loading-indicator"><img src="img/ajax-loader.gif"/></div>' +
            '</div>';
        var json = this.model;
        var output = Mustache.to_html(template, json);
        $(this.el).html(output);
        $('#title').html(this.el);
        $(document).attr('title',this.model.radiatorTitle);
        return this;
    }
});