var RadiatorView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
        this.jobList = this.options.collection;
        this.jobList.bind("change", this.render);
        this.lastSoundPlayed = "";
    },

    render: function(){
        this.renderHealth();
        this.renderMetrics();
        this.renderAudio();
    },
    renderAudio: function(){
        if (this.jobList.buildsAreFailing() && this.lastSoundPlayed != "boo") {
            this.lastSoundPlayed = "boo";
            $("audio#booing-audio")[0].play();
        }
        if (!this.jobList.buildsAreFailing() && this.lastSoundPlayed != "cheer"){
            this.lastSoundPlayed = "cheer";
            $("audio#cheering-audio")[0].play();
        }
    },
    renderMetrics: function(){
        var passingBuildsView  = new BuildMetricView({"title":"Passing", "count":this.jobList.passingCount()});
        var failingBuildsView  = new BuildMetricView({"title":"Failing", "count":this.jobList.failingCount()});
        var buildingBuildsView = new BuildMetricView({"title":"Building", "count":this.jobList.buildingCount()});
        var disabledBuildsView = new BuildMetricView({"title":"Disabled", "count":this.jobList.disabledCount()});

        $(".build-metrics-wrapper .build-metric.passing-count").html(passingBuildsView.render().el);
        $(".build-metrics-wrapper .build-metric.failing-count").html(failingBuildsView.render().el);
        $(".build-metrics-wrapper .build-metric.building-count").html(buildingBuildsView.render().el);
        $(".build-metrics-wrapper .build-metric.disabled-count").html(disabledBuildsView.render().el);
    },
    renderHealth: function(){
        $('.build-health-wrapper .build-health').removeClass("passing");
        $('.build-health-wrapper .build-health').removeClass("failing");
        if (this.jobList.buildsAreFailing()) {
            $(".build-health").html("");
            $('.build-health-wrapper .build-health').addClass("failing");
            _.each(this.jobList.failingBuilds(), function(job){
                $(".build-health").append(new JobView({model:job}).render().el);
            });
        }else{
            $('.build-health-wrapper .build-health').addClass("passing");
            $('.build-health-wrapper .build-health').html('<div class="icon"></div>');
            this.addPassingIcon();
        };
    },
    addPassingIcon: function(){
        $('.build-health-wrapper .build-health .icon').html('<i class="icon-heart icon-white"></i>');
    }
});