JR.BuildServerView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "build-health-wrapper row-fluid",
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },
    render: function(){
        console.log("Rendering buildserver view");
        _.each(this.model.getJobs().toArray(), function(job){
            console.log("Appending job to output: " + JSON.stringify(job));
            this.$el.append(new JR.JobView({model:job}).render().el);
        }, this);
        console.log("Setting #container content to " + this.el );
        $('#container').html(this.el);
        return this;
    }
});