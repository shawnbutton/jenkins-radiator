JR.HelpView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "build-health-wrapper row-fluid",
    render: function(){
        _.each(this.options.configs, function(config){
            this.$el.append("<p>" + JSON.stringify(config) + "</p>");
        }, this);
        return this;
    }
});