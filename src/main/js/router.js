JR.AppRouter = Backbone.Router.extend({
    routes: {
        "":                     "help",
        "help":                 "help",
        "builds/:configIdx":    "builds",  // #builds/0
        "radiator/:configIdx":  "radiator"  // #radiator/0
    },
    builds: function(configIdx){
        this.selectConfig(configIdx);
        var titleView = new JR.RadiatorTitleView({model: config});

        var model = new JR.BuildServer();
        var buildServerView = new JR.BuildServerView({model: model});
        model.fetch({success: function(model, response){
            if(LOG.isDebugEnabled()){
                LOG.debug("Fetched build server model");
            }
            //radiator.trigger("change:buildServer");
            buildServerView.render();
        }, error: function(model, response){
            LOG.error("Fetching build server model failed, radiator view not rendered. Model: " + JSON.stringify(model) + ", response: " + JSON.stringify(response));
        }});
    },
    help: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Rendering help view");
        }
        var helpView = new JR.HelpView({configs:configs});
        $('#container').html(helpView.render().el);
    },
    radiator:function(configIdx){
        this.selectConfig(configIdx);
        if(LOG.isDebugEnabled()){
            LOG.debug("Using config: " + JSON.stringify(config));
        }
        var titleView = new JR.RadiatorTitleView({model: config});

        var buildServer = new JR.BuildServer();

        var radiator = new JR.Radiator({
            "buildServer": buildServer,
            "includeFilter":config.includeFilter,
            "excludeFilter":config.excludeFilter
        });
        if(LOG.isDebugEnabled()){
            LOG.debug("Radiator model created");
        }

        var radiatorView = new JR.RadiatorView({model: radiator});
        var fetchAndRender =  function(){
            radiatorView.trigger('loading');
            buildServer.fetch({success: function(model, response){
                if(LOG.isDebugEnabled()){
                    LOG.debug("Fetched build server model");
                }
                radiator.set('buildServer', buildServer);
                if(LOG.isDebugEnabled()){
                    LOG.debug("Triggering change of radiator model");
                }
                radiatorView.trigger('loaded');
                radiator.trigger('change');
            }, error: function(model, response){
                LOG.error("Fetching build server model failed, radiator view not rendered. Model: " + JSON.stringify(model) + ", response: " + JSON.stringify(response));
            }});
        };
        if(LOG.isDebugEnabled()){
            LOG.debug("Refreshing every " + config.refresh_interval/1000 + " seconds as specified by config.refresh_interval");
        }
        fetchAndRender();
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