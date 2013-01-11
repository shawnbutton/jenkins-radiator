JR.JobsPassingView = Backbone.View.extend({
    className: "row-fluid build-health passing",
    initialize: function(){
        _.bindAll(this, 'render');
    },
    render: function(){
        var template = "<div class='span12'>" +
            "<div class=\"icon\">" +
            "<i class=\"icon-ok-sign icon-white\"></i>" +
            "</div>" +
            "</div>";
        var output = Mustache.to_html(template, {});
        $(this.el).html(output);
        return this;
    }
});