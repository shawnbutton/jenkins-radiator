module("view/radiator");
test("Radiator view cannot be instantiated without a job collection", function(){
    var errThrown = false;
    try{
        var view = new RadiatorView();

    }catch(err){
        errThrown=true;
    }
    ok(errThrown);
});

test("Radiator view instantiated with a job collection", function(){
    var jobList = new JobsCollection();
    var view = new RadiatorView({"collection":jobList});
    ok(view);
});

