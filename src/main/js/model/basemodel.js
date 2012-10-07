// This represents a build of a Jenkins job
JR.BaseModel = Backbone.RelationalModel.extend({
    // This is the url root of all our models
    urlRoot: function(){
        console.log("Getting urlRoot: " + config.ci_json_url);
        return config.ci_json_url;
    },
    urlPostfixForJsonApi: "/api/json"
});