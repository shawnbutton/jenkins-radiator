JR.AppRouter = Backbone.Router.extend({
    routes: {
        "":                     "help",
        "help":                 "help",
        "builds/:configIdx":    "builds",  // #builds/0
        "radiator/:configIdx":  "radiator"  // #radiator/0
    },

    builds: function(configIdx){
        this.selectConfig(configIdx);
        var model = new JR.BuildServer();
        var buildServerView = new JR.BuildServerView({model: model});
        model.fetch({success: function(model, response){
            LOG.debug("Fetched build server model"); //: " + JSON.stringify(model));
            //radiator.trigger("change:buildServer");
            buildServerView.render();
        }, error: function(model, response){
            LOG.error("Fetching build server model failed, radiator view not rendered. Model: " + JSON.stringify(model) + ", response: " + JSON.stringify(response));
        }});
    },
    help: function(){
        LOG.debug("Rendering help view");
        var helpView = new JR.HelpView({configs:configs});
        $('#container').html(helpView.render().el);
    },
    radiator:function(configIdx){
        this.selectConfig(configIdx);
        LOG.debug("Using config: " + JSON.stringify(config));

        var buildServer = new JR.BuildServer();

        var radiator = new JR.Radiator({
            "buildServer": buildServer,
            "includeFilter":config.includeFilter,
            "excludeFilter":config.excludeFilter
        });
        LOG.debug("Radiator model created");

        var radiatorView = new JR.RadiatorView({model: radiator});
        LOG.debug("Radiator view created");

        var fetchAndRender =  function(){
            buildServer.fetch({success: function(model, response){
                LOG.debug("Fetched build server model"); //: " + JSON.stringify(model));
                //radiator.trigger("change:buildServer");
                radiator.set('buildServer', buildServer);
                // TODO: This should be triggered by the set
                radiator.processChangedBuildServer();
                // TODO: This should happen automatically...
                radiatorView.render();
            }, error: function(model, response){
                LOG.error("Fetching build server model failed, radiator view not rendered. Model: " + JSON.stringify(model) + ", response: " + JSON.stringify(response));
            }});
        };
        fetchAndRender();
        LOG.debug("Data fetched once");

        LOG.debug("Refreshing every " + config.refresh_interval/1000 + " seconds as specified by config.refresh_interval");
        setInterval(fetchAndRender, config.refresh_interval);
    },
    selectConfig: function(configIdx){
        var idx=parseInt(configIdx, 10);
        if(idx){
            if(idx>=configs.length){
                idx=0;
            }else if(idx<0){
                idx=0;
            }
            config = configs[idx];
        }
    }
});