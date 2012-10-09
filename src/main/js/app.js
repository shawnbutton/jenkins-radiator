$(document).ready(function(){
    LOG.debug("About to create the router");
    var app = new JR.AppRouter();
    LOG.debug("Router created");
    Backbone.history.start();
    LOG.debug("Backbone history started");
});