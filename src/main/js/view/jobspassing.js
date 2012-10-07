JR.JobsPassingView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
    },
    render: function(){
        var template = "<div class=\"icon\"><i class=\"icon-heart icon-white\"></i></div>";
        var output = Mustache.to_html(template, {});
        $(this.el).html(output);
        this.$el.addClass('span12');
        this.$el.addClass('build-health');
        this.$el.addClass('passing');
        return this;
    }
});