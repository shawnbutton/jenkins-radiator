// Should point to the jenkins API json
// e.g. http://ci.example.com/api/json

var config = {
    ci_json_url:"http://ci.example.com/api/json",
    refresh_interval: 60000,
    excludeFilter: ["Excluded build name"],
	includeFilter: ["Included build name"]
	// Both can be used, normal boolean logic is used to determine if a job is used in this radiator
}

// Should point to the jenkins API json
// e.g. http://ci.example.com/api/json