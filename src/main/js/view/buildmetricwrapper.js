JR.BuildMetricWrapperView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },
    render: function(){

        this.$el.html("");

        var includedBuildsView  = new JR.BuildMetricView({"title":"All", "count":this.model.get('includedJobCount')});
        includedBuildsView.render();
        var passingBuildsView  = new JR.BuildMetricView({"title":"Passing", "count":this.model.get('passingJobCount')});
        passingBuildsView.render();
        var failingBuildsView  = new JR.BuildMetricView({"title":"Failing", "count":this.model.get('failingJobCount')});
        failingBuildsView.render();
        var buildingBuildsView = new JR.BuildMetricView({"title":"Building", "count":this.model.get('buildingJobCount')});
        buildingBuildsView.render();
        var disabledBuildsView = new JR.BuildMetricView({"title":"Disabled", "count":this.model.get('disabledJobCount')});
        disabledBuildsView.render();

        this.$el.append(includedBuildsView.el);
        this.$el.append(passingBuildsView.el);
        this.$el.append(failingBuildsView.el);
        this.$el.append(buildingBuildsView.el);
        this.$el.append(disabledBuildsView.el);

        this.$el.addClass('build-metrics-wrapper');
        this.$el.addClass('row-fluid');

        return this;
    }
});