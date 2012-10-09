JR.JobView = Backbone.View.extend({
    // TODO: This is a "Job state view, displaying only the name & color indicating state"
    className:"job-view",

    initialize: function(){
        _.bindAll(this, 'render');
    },

    render: function(){
        var template = "<span style=\"width:100%\"><h1>{{name}}</h1></span>";
        var json = this.model.toJSON();
        LOG.debug("Model as json: " + JSON.stringify(json));
        var output = Mustache.to_html(template, json);
        $(this.el).html(output);
        $(this.el).addClass(this.model.get("color"));
        return this;
    }
});