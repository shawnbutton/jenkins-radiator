module("view/job");
test("Job view constructor", function(){
    var view = new JR.JobView();
    ok(view);
});

test("Job view constructor", function(){
    var view = new JR.JobView();
    ok(view);
});

test("Job view renders and has expected title", function(){
    var job = new JR.Job(json.jobs[0]);
    ok(job);
    equal(job.getName(), 'Abdera-trunk');
    var view  = new JR.JobView({"model":job});
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewContains(view.el, "Abdera-trunk"));
    ok(JR.ViewHelpers.viewEquals(view.el, "<span style=\"width:100%\"><h1>Abdera-trunk</h1></span>"));
});