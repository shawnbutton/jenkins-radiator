// Should point to the jenkins API json
// e.g. http://ci.example.com/api/json

var configs = [
{
	ci_json_url:"https://builds.apache.org",
    refresh_interval: 24000,
    radiatorTitle: 'Apache jobs',
    excludeFilter: [],
    includeFilter: ["ActiveMQ","Apache Wicket 6.0.x","Commons"]
}
];

// By default use first config.
// Url parameter config=1 can be used to select another, like this:
// jenkins-radiator/index.html?config=1
// defaults to 0, i.e. jenkins-radiator/index.html?config=0
var config = configs[0];