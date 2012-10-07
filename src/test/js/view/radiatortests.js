module("view/radiator");
test("Radiator view cannot be instantiated without a job collection", function(){
    var errThrown = false;
    try{
        var view = new JR.RadiatorView();

    }catch(err){
        errThrown=true;
    }
    ok(errThrown);
});

test("Radiator view renders to expected", function(){
    var buildServer = new JR.BuildServer(json);
    var radiator = new JR.Radiator({
        "buildServer": buildServer,
        "includeFilter":config.includeFilter,
        "excludeFilter":config.excludeFilter
    });
    var view = new JR.RadiatorView({model:radiator});
    ok(view, "Radiator view created");
    view.render();

    ok(JR.ViewHelpers.viewEquals(view.el, "<div class=\"span12 build-health passing\" style=\"display: none\"><div class=\"icon\"><i class=\"icon-heart icon-white\"></i></div></div><div class=\"span12 build-health failing\" style=\"display: block\"><div class=\"job-view red\"><span style=\"width:100%\"><h1>ActiveMQ</h1></span></div></div><div class=\"build-metrics-wrapper row-fluid\"><div class=\"span3 build-metric Passing-count\"><h1>Passing</h1><p>6</p></div><div class=\"span3 build-metric Failing-count\"><h1>Failing</h1><p>1</p></div><div class=\"span3 build-metric Building-count\"><h1>Building</h1><p>0</p></div><div class=\"span3 build-metric Disabled-count\"><h1>Disabled</h1><p>0</p></div></div>"));
});
