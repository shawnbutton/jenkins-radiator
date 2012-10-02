// Should point to the jenkins API json
// e.g. http://ci.example.com/api/json

var configs = [
{
	ci_json_url:"http://ci.example.com/api/json",
    refresh_interval: 12000,
    radiatorTitle: 'Radiator 1 title',
    excludeFilter: ["Excluded build name"],
    includeFilter: ["Included build name"]
},
{
	ci_json_url:"http://ci.example.com/api/json",
    refresh_interval: 12000,
    radiatorTitle: 'Radiator 2 title',
    excludeFilter: ["Excluded build name"],
    includeFilter: ["Included build name"]
}
];

// By default use first config.
// Url parameter config=1 can be used to select another, like this:
// jenkins-radiator/index.html?config=1
// defaults to 0, i.e. jenkins-radiator/index.html?config=0
var config = configs[0];