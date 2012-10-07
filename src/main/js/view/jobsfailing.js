JR.JobsFailingView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
    },
    render: function(){
        _.each(this.options.failingJobs, function(job){
            this.$el.append(new JR.JobView({model:job}).render().el);
        }, this);
        this.$el.addClass('span12');
        this.$el.addClass('build-health');
        this.$el.addClass('failing');
        return this;
    }
});