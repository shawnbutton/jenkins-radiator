module("view/jobspassing");
test("Job view renders and has expected title", function(){
    var view = new JR.JobsPassingView();
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewEquals(view.el, "<div class=\"icon\"><i class=\"icon-heart icon-white\"></i></div>"));
});