module("model/job");
test("Empty constructor", function(){
    var job = new JR.Job();
    ok(job);
});

test("Job from json", function(){
    var job = new JR.Job(json.jobs[0]);
    ok(job);
    equal(job.getName(), 'Abdera-trunk');
});