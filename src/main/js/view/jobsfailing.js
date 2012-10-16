JR.JobsFailingView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },
    render: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Rendering failing jobs view");
        }
        // Reset first
        this.$el.html("");

        //Add failing jobs
        _.each(this.model.get('failingJobs'), function(job){
            this.$el.append(new JR.JobView({model:job}).render().el);
        }, this);
        this.$el.addClass('span12');
        this.$el.addClass('build-health');
        this.$el.addClass('failing');
        return this;
    }
});