$(document).ready(function(){
    console.log("About to create the router");
    var app = new JR.AppRouter();
    console.log("Router created");
    Backbone.history.start();
    console.log("Backbone history started");
});