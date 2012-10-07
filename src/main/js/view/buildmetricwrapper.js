JR.BuildMetricWrapperView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
    },
    render: function(){

        var passingBuildsView  = new JR.BuildMetricView({"title":"Passing", "count":this.options.passingJobCount});
        passingBuildsView.render();
        var failingBuildsView  = new JR.BuildMetricView({"title":"Failing", "count":this.options.failingJobCount});
        failingBuildsView.render();
        var buildingBuildsView = new JR.BuildMetricView({"title":"Building", "count":this.options.buildingJobCount});
        buildingBuildsView.render();
        var disabledBuildsView = new JR.BuildMetricView({"title":"Disabled", "count":this.options.disabledJobCount});
        disabledBuildsView.render();

        this.$el.append(passingBuildsView.el);
        this.$el.append(failingBuildsView.el);
        this.$el.append(buildingBuildsView.el);
        this.$el.append(disabledBuildsView.el);

        this.$el.addClass('build-metrics-wrapper');
        this.$el.addClass('row-fluid');

        return this;
    }
});