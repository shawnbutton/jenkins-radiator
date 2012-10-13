JR.RadiatorView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "build-health-wrapper row-fluid",
    loadingTimer: null,
    loadingView: null,
    loadingInterval : null,
    loading: function(){
        LOG.info("Loading");
        this.loadingTimer = new JR.LoadingTimer({secondsPassed:0, enabled:true});
        this.loadingView = new JR.LoadingView({model: this.loadingTimer});
        this.loadingView.render();
        _.bindAll(this, 'updateLoadingTimer');
        _.bindAll(this, 'loaded');
        this.loadingInterval = setInterval(this.updateLoadingTimer, 1000);
    },
    updateLoadingTimer: function(){
        LOG.info("Loading more");
        this.loadingTimer.set('secondsPassed', this.loadingTimer.get('secondsPassed')+1);
    },
    loaded: function(){
        LOG.info("Loaded");
        clearInterval(this.loadingInterval);
        this.loadingView.remove();
    },
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.lastSoundPlayed = "";
        this.loading();
    },
    render: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Rendering radiator view from radiator model");
        }
        if(this.model.get('loaded')){
            this.loaded();
            this.renderHealth();
            this.renderAudio();
            this.renderMetrics();
            $('#container').html(this.el);
        }else{
            $('#container').html(this.loadingView.el);
        }
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