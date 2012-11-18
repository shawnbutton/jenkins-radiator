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

        var template = "<span style=\"width:100%\">" +
            "<div class='config'>" +
            "<h1>How to configure</h1>" +
            "<p>To configure this Jenkins Radiator, edit the <a href='config.js'>config.js</a> to specify</p>" +
            "<ul>" +
            "<li>where your build server is located, </li>" +
            "<li>what jobs you want to include in a radiator, or</li>" +
            "<li>what jobs you want to exclude from a radiator</li>" +
            "</ul>" +
            "<p>You can configure multiple build servers and radiators in the config.</p>"
            "</div>";
        var output = Mustache.to_html(template, {});
        this.$el.append(output);

        return this;
    }
});