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
            "<h1>{{radiatorTitle}}</h1>" +
            "<table>" +
            "<tr><th>Url</th><td>{{ci_json_url}}</td></tr>" +
            "<tr><th>Refresh interval</th><td>{{refresh_interval}}ms</td></tr>" +
            "<tr><th>Exclude filter</th><td>{{excludeFilter}}</td></tr>" +
            "<tr><th>Include filter</th><td>{{includeFilter}}</td></tr>" +
            "</table>" +
            "<h2>Builds</h2>" +
            "<p><a href='#builds/{{idx}}'>Builds</a></p>" +
            "<h2>Radiator</h2>" +
            "<p><a href='#radiator/{{idx}}'>Radiator</a></p>" +
            "</span>";
        var json = this.options.config;
        json.idx = this.options.configIdx;
        LOG.debug("Rendering config view from " + JSON.stringify(json));
        var output = Mustache.to_html(template, json);
        $(this.el).html(output);
        return this;
    }
});