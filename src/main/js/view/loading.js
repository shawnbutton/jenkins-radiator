JR.LoadingView = Backbone.View.extend({
    className:"loading-view",
    className:'span12 build-health',
    initialize: function(){
        _.bindAll(this, 'render');
    },
    render: function(){
        var template = '<h1 class="loading">Loading...</h1>';
        var json = {};
        var output = Mustache.to_html(template, json);
        $(this.el).html(output);
        return this;
    }
});