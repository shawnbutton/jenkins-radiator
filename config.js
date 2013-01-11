// Should point to the jenkins API json
// e.g. http://ci.example.com/api/json

var configs = [
    {
        ci_json_url:"http://builder:8080/api/json",
        refresh_interval: 240000,
        radiatorTitle: 'All Builds',
        excludeFilter: [],
        includeFilter: []
    },
    {
        ci_json_url:"http://builder:8080/api/json",
        refresh_interval: 240000,
        radiatorTitle: 'Tornados Builds',
        excludeFilter: [],
        includeFilter: ["ETR407PSConversation-trunk", "ETR407Utility-trunk", "PAPaymentWebservice-trunk",
            "PCPaymentWebservice-trunk", "PlateMaintenance-trunk", "ETR407MALServices-trunk", "CustomerCDCMonitor-trunk"]
    }
];

// By default use first config.
// Url parameter config=1 can be used to select another, like this:
// jenkins-radiator/index.html?config=1
// defaults to 0, i.e. jenkins-radiator/index.html?config=0
var config = configs[0];

// Logging configuration, levels the same as Log4j has
var loggingConfig = {
    debug: false,
    info: true
};
