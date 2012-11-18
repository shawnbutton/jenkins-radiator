JR.BuildServerView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "container-fluid",
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },
    render: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Rendering buildserver view");
        }
        _.each(this.model.getJobs().toArray(), function(job){
            if(LOG.isDebugEnabled()){
                LOG.debug("Appending job to output: " + JSON.stringify(job));
            }
            this.$el.append(new JR.JobView({model:job}).render().el);
        }, this);
        if(LOG.isDebugEnabled()){
            LOG.debug("Setting #container content to " + this.el );
        }
        $('#container').html(this.el);
        return this;
    }
});