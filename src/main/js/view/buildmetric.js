var BuildMetricView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
    },

    render: function(){
        var template = $("#buildMetricTemplate").html();
        $(this.el).append(Mustache.to_html(template, this.options));
        return this;
    }
});