// This represents a build of a Jenkins job
JR.Build = JR.BaseModel.extend({
    // Use the job url as the id
    idAttribute: "url",
    url: function(){
        return this.id + this.urlPostfixForJsonApi;
    },
    getNumber: function(){
        return this.get("number");
    },
    getUrl: function(){
        return this.get("url");
    }
});


/*
Example data

 {
 "number": 1094,
 "url": "https://builds.apache.org/job/ActiveMQ/1094/"
 }
*/