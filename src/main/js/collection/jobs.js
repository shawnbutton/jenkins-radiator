// This represents all the jobs as listed by the Jenkins JSON API
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