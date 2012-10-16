// This represents the Build Server, which reports multiple jobs, their builds etc.
JR.BuildServer = JR.BaseModel.extend({
    idAttribute: "url",
    url: function(){
        var url = this.urlRoot() + this.urlPostfixForJsonApi;
        if(LOG.isDebugEnabled()){
            LOG.debug("Returning url of build server: " + url);
        }
        return url;
    },
    sync: function(method, model, options) {
        if(LOG.isTraceEnabled()){
            LOG.trace("About to sync. Method " + method + ", options=" + JSON.stringify(options));
        }
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            processData: true,
            url: this.url() + "?jsonp=?"
        }, options);
        if(LOG.isDebugEnabled()){
            LOG.debug("Final url " + params.url);
        }
        return $.ajax(params);
    },
    relations: [{
        type: Backbone.HasMany,
        key: 'jobs',
        relatedModel: 'JR.Job'
    }],
    getMode: function(){
        return this.get('mode');
    },
    getJobs: function(){
        return this.get('jobs');
    }

});