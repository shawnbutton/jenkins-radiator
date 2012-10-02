// This represents a Jenkins job
var Job = Backbone.Model.extend({
});

var JobsCollection = Backbone.Collection.extend({
  model: Job,
  sync: function(method, model, options) {
      var params = _.extend({
          type: 'GET',
          dataType: 'jsonp',
          processData: true,
          url: config.ci_json_url + "?jsonp=?"
      }, options);
      return $.ajax(params);
  },
  parse: function(response) {
	  this.allJobs = response.jobs;
      this.excludedJobs = _.filter(response.jobs, function(job){
          return _.include(config.excludeFilter, job.name) || (config.includeFilter.length>0 && !_.include(config.includeFilter, job.name));
      });
      this.includedJobs = _.filter(response.jobs, function(job){
    	  return !_.include(config.excludeFilter, job.name) && (config.includeFilter.length<1 || _.include(config.includeFilter, job.name));
      });
      return this.includedJobs;
  },
  failingBuilds:function(){
      var builds = this.filter(function(job){
         return (job.get("color") == "red" || job.get("color") == "red_anime") && !_.include(config.excludeFilter, job.get("name"));;
      });
      return builds;
  },
  passingCount:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "blue" || job.get("color") == "blue_anime";
      });
      return builds.length;
  },
  failingCount:function(){
      var builds = this.filter(function(job){
         return (job.get("color") == "red" || job.get("color") == "red_anime") && !_.include(config.excludeFilter, job.get("name"));;
      });
      return builds.length;
  },
  buildingCount:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "red_anime" || job.get("color") == "blue_anime";
      });
      return builds.length;
  },
  disabledCount:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "grey";
      });
      return builds.length;
  },
  buildsAreFailing:function(){
      if (this.failingCount() > 0) {
          return true;
      }else{
          return false;
      };
  }


});

var JobView = Backbone.View.extend({
  className:"job-view",

  events: {
    // 'click button#add': 'callback'
  },

  initialize: function(){
    _.bindAll(this, 'render');
  },

  render: function(){
      var template = $("#jobViewTemplate").html();
      $(this.el).append(Mustache.to_html(template, this.model.toJSON()));
      $(this.el).addClass(this.model.get("color"));
      return this;
  }
});

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

var BuildMetricView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
    },

    render: function(){
        var template = $("#buildMetricTemplate").html();
        $(this.el).append(Mustache.to_html(template, this.options));
        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes: {
        "":"home"
    },

    home:function(){
    	this.selectConfig();
    	this.renderTitle();
        var jobList = new JobsCollection();
        var radiatorView = new RadiatorView({"collection":jobList});
        jobList.fetch({success: function(){
            radiatorView.render();
        }});
        var fetchAndDisplay = function(){
            setTimeout(function(){
                jobList.fetch({success: function(){
                    radiatorView.render();
                }});
                fetchAndDisplay();
            }, config.refresh_interval);
        }
        fetchAndDisplay();
    },
    
    renderTitle:function(){
	    $("#radiatorTitle").html(config.radiatorTitle);
	    $(document).attr('title',config.radiatorTitle);
    },
    
    selectConfig: function(){
    	var idx=parseInt(this.getRequestParameter("config"), 10);
    	if(idx){
    		if(idx>=configs.length){
    			idx=0;
    		}else if(idx<0){
    			idx=0;
    		}
    		config = configs[idx];
    	}
    },
    
    getRequestParameter: function(paramName) {
    	  var searchString = window.location.search.substring(1),
    	      i, val, params = searchString.split("&");

    	  for (i=0;i<params.length;i++) {
    	    val = params[i].split("=");
    	    if (val[0] == paramName) {
    	      return unescape(val[1]);
    	    }
    	  }
    	  return null;
    }    
});