var JobView = Backbone.View.extend({
    className:"job-view",

    events: {
        // 'click button#add': 'callback'
    },

    initialize: function(){
        _.bindAll(this, 'render');
    },

    render: function(){
        var template = $("#jobViewTemplate").html();
        $(this.el).append(Mustache.to_html(template, this.model.toJSON()));
        $(this.el).addClass(this.model.get("color"));
        return this;
    }
});