module("model/job");
test("Empty constructor", function(){
    var job = new JR.Job();
    ok(job);
});

test("Job Abdera-trunk from json is valid", function(){
    var job = new JR.Job(json.jobs[0]);
    ok(job);
    equal(job.getName(), 'Abdera-trunk');
});

test("Job Abdera2-trunk from json is valid", function(){
    var job = new JR.Job(json.jobs[1]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Abdera2-trunk');
});

test("Job Accumulo-1.3.x from json is valid", function(){
    var job = new JR.Job(json.jobs[2]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Accumulo-1.3.x');
});

test("Job Accumulo-1.4.x from json is valid", function(){
    var job = new JR.Job(json.jobs[3]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Accumulo-1.4.x');
});

test("Job Accumulo-trunk from json is valid", function(){
    var job = new JR.Job(json.jobs[4]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Accumulo-Trunk');
});

test("Job ACE-trunk from json is valid", function(){
    var job = new JR.Job(json.jobs[5]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'ACE-trunk');
});

test("Job ActiveMQ from json is valid", function(){
    var job = new JR.Job(json.jobs[6]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'ActiveMQ');
});

test("Job with unknown color is not valid", function(){
    try{
        var job = new JR.Job({name: 'Invalid job', color: 'unknown', url: 'http:/foo.bar'});
        console.log("job.isValid(): " + job.isValid());
        ok(!job.isValid(), "Must not get here");
    }catch(err){
        ok(err);
    }

});