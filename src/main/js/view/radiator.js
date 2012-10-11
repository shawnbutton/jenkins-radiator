JR.RadiatorView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "build-health-wrapper row-fluid",
    initialize: function(){
        _.bindAll(this, 'render');
        //this.model.bind('change', this.render);
        this.renderLoadingForFirstTime();
        this.lastSoundPlayed = "";
    },
    renderLoadingForFirstTime: function(){
        $('#container').html(new JR.LoadingView().render().el);
    },
    render: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Rendering radiator view from radiator model");
        }
        this.renderHealth();
        this.renderAudio();
        this.renderMetrics();
        $('#container').html(this.el);
        return this;
    },
    renderHealth: function(){
        // This view is displayed if all jobs are passing
        this.jobsPassingView = new JR.JobsPassingView();
        this.jobsPassingView.render();
        this.$el.append(this.jobsPassingView.el);

        //This view is displayed if there are failing jobs
        this.jobsFailingView = new JR.JobsFailingView({failingJobs: this.model.getFailingJobs()});
        this.jobsFailingView.render();
        this.$el.append(this.jobsFailingView.el);

        if (this.model.buildsAreFailing()) {
            this.jobsPassingView.$el.hide();
            this.jobsFailingView.$el.show();
        }else{
            this.jobsFailingView.$el.hide();
            this.jobsPassingView.$el.show();
        }
    },
    renderAudio: function(){
        if (this.model.buildsAreFailing() && this.lastSoundPlayed != "boo") {
            this.lastSoundPlayed = "boo";
            $("audio#booing-audio")[0].play();
        }else if (this.model.buildsArePassing() && this.lastSoundPlayed != "cheer"){
            this.lastSoundPlayed = "cheer";
            $("audio#cheering-audio")[0].play();
        }
    },
    renderMetrics: function(){
        var metricsWrapperView = new JR.BuildMetricWrapperView({
            passingJobCount: this.model.getPassingJobsCount(),
            failingJobCount: this.model.getFailingJobsCount(),
            buildingJobCount: this.model.getBuildingJobsCount(),
            disabledJobCount: this.model.getDisabledJobsCount()
        });
        metricsWrapperView.render();
        this.$el.append(metricsWrapperView.el);
    }
});