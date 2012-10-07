module("view/buildmetricwrapper");
test("Build metric view constructor", function(){
    var view = new JR.BuildMetricWrapperView();
    ok(view);
});

test("Build metric view constructor", function(){
    var view = new JR.BuildMetricWrapperView();
    ok(view);
    view.render();
});

test("Build metric view renders and has expected title", function(){
    var options = {
        passingJobCount: 1,
        failingJobCount: 2,
        buildingJobCount: 3,
        disabledJobCount: 4
    }
    var view = new JR.BuildMetricWrapperView(options);
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewContains(view.el, "Passing"));
    ok(JR.ViewHelpers.viewContains(view.el, "Failing"));
    ok(JR.ViewHelpers.viewContains(view.el, "Building"));
    ok(JR.ViewHelpers.viewContains(view.el, "Disabled"));
});

test("Build metric view renders and outputs expected content", function(){
    var options = {
        passingJobCount: 1,
        failingJobCount: 2,
        buildingJobCount: 3,
        disabledJobCount: 4
    }
    var view = new JR.BuildMetricWrapperView(options);
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewEquals(view.el, "<div class=\"span3 build-metric Passing-count\"><h1>Passing</h1><p>1</p></div><div class=\"span3 build-metric Failing-count\"><h1>Failing</h1><p>2</p></div><div class=\"span3 build-metric Building-count\"><h1>Building</h1><p>3</p></div><div class=\"span3 build-metric Disabled-count\"><h1>Disabled</h1><p>4</p></div>"));
});