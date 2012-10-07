module("view/jobsfailing");
test("Jobs failing view renders and produces empty content when no jobs listed", function(){
    var options = {
        failingJobs: []
    };
    var view = new JR.JobsFailingView(options);
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewEquals(view.el, ""));
});

test("Jobs failing view renders and produces job list content when jobs listed", function(){
    var options = {
        failingJobs: [
            new JR.Job({
                "color": "blue",
                "name": "Abdera-trunk",
                "url": "https://builds.apache.org/job/Abdera-trunk/"
            }),
            new JR.Job({
                "color": "blue",
                "name": "Abdera2-trunk",
                "url": "https://builds.apache.org/job/Abdera2-trunk/"
            }),
            new JR.Job({
                "color": "blue",
                "name": "Accumulo-1.3.x",
                "url": "https://builds.apache.org/job/Accumulo-1.3.x/"
            })
        ]
    };
    var view = new JR.JobsFailingView(options);
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewEquals(view.el, "<div class=\"job-view blue\"><span style=\"width:100%\"><h1>Abdera-trunk</h1></span></div><div class=\"job-view blue\"><span style=\"width:100%\"><h1>Abdera2-trunk</h1></span></div><div class=\"job-view blue\"><span style=\"width:100%\"><h1>Accumulo-1.3.x</h1></span></div>"));
    ok(JR.ViewHelpers.viewEquals(view.el, "<div class=\"job-view blue\"><span style=\"width:100%\"><h1>Abdera-trunk</h1></span></div><div class=\"job-view blue\"><span style=\"width:100%\"><h1>Abdera2-trunk</h1></span></div><div class=\"job-view blue\"><span style=\"width:100%\"><h1>Accumulo-1.3.x</h1></span></div>"));
});