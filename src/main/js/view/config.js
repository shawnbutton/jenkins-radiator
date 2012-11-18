JR.ConfigView = Backbone.View.extend({
    className:"config-view",
    initialize: function(){
        _.bindAll(this, 'render');
    },
    render: function(){
//        {
//            ci_json_url:"https://builds.apache.org",
//                refresh_interval: 24000,
//            radiatorTitle: 'A few Apache jobs',
//            excludeFilter: [],
//            includeFilter: ["ActiveMQ","Apache Wicket 6.0.x","Commons"]
//        },
//        "builds/:configIdx":    "builds",  // #builds/0
//        "radiator/:configIdx":  "radiator"  // #radiator/0

        var template = "<span style=\"width:100%\">" +
            "<div class='config'>" +
            "<h1>{{radiatorTitle}}</h1>" +
            "<div class='table'>" +
            "<table>" +
            "<tr><th>Url</th><td>{{ci_json_url}}</td></tr>" +
            "<tr><th>Refresh interval</th><td>{{refresh_interval}}ms</td></tr>" +
            "<tr><th>Exclude filter</th><td>{{excludeFilter}}</td></tr>" +
            "<tr><th>Include filter</th><td>{{includeFilter}}</td></tr>" +
            "</table>" +
            "</div>" +
            "<div class='urls'>" +
            "<p><a href='#builds/{{idx}}'>List all builds from server</a></p>" +
            "<p><a href='#radiator/{{idx}}'>Show radiator</a></p>" +
            "</div>" +
            "</div>";
        var json = this.options.config;
        json.idx = this.options.configIdx;
        if(LOG.isDebugEnabled()){
            LOG.debug("Rendering config view from " + JSON.stringify(json));
        }
        var output = Mustache.to_html(template, json);
        $(this.el).html(output);
        return this;
    }
});