$(document).ready(function(){
    if(LOG.isDebugEnabled()){
        LOG.debug("About to create the router");
    }
    var app = new JR.AppRouter();
    if(LOG.isDebugEnabled()){
        LOG.debug("Router created");
    }
    Backbone.history.start();
    if(LOG.isDebugEnabled()){
        LOG.debug("Backbone history started");
    }
});