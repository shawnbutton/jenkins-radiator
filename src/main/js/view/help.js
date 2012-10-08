JR.HelpView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "build-health-wrapper row-fluid",
    render: function(){
        var idx=0;
        _.each(this.options.configs, function(config){
            this.$el.append(new JR.ConfigView({config: config, configIdx: idx++}).render().el);
        }, this);
        return this;
    }
});