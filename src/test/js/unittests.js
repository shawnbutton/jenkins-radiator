configs = [
    {
        ci_json_url:"https://builds.apache.org/api/json",
        refresh_interval: 12000,
        radiatorTitle: 'Apache jobs',
        excludeFilter: [],
        includeFilter: []
    }
];
config = configs[0];

json = {
    "assignedLabels": [
        {}
    ],
    "description": "<a href=\"http://www.apache.org/\"><img src=\"https://www.apache.org/images/asf_logo_wide.gif\"></img></a>\r\n<p>\r\nThis is a public build and test server for <a href=\"http://projects.apache.org/\">projects</a> of the\r\n<a href=\"http://www.apache.org/\">Apache Software Foundation</a>. All times on this server are UTC.\r\n</p>\r\n<p>\r\nSee the <a href=\"http://wiki.apache.org/general/Hudson\">Jenkins wiki page</a> for more information\r\nabout this service.\r\n</p>",
    "jobs": [
        {
            "color": "blue",
            "name": "Abdera-trunk",
            "url": "https://builds.apache.org/job/Abdera-trunk/"
        },
        {
            "color": "blue",
            "name": "Abdera2-trunk",
            "url": "https://builds.apache.org/job/Abdera2-trunk/"
        },
        {
            "color": "blue",
            "name": "Accumulo-1.3.x",
            "url": "https://builds.apache.org/job/Accumulo-1.3.x/"
        },
        {
            "color": "blue",
            "name": "Accumulo-1.4.x",
            "url": "https://builds.apache.org/job/Accumulo-1.4.x/"
        },
        {
            "color": "blue",
            "name": "Accumulo-Trunk",
            "url": "https://builds.apache.org/job/Accumulo-Trunk/"
        },
        {
            "color": "yellow",
            "name": "ACE-trunk",
            "url": "https://builds.apache.org/job/ACE-trunk/"
        },
        {
            "color": "red",
            "name": "ActiveMQ",
            "url": "https://builds.apache.org/job/ActiveMQ/"
        },
        {
            "color": "blue",
            "name": "ZooKeeper_branch34_solaris",
            "url": "https://builds.apache.org/job/ZooKeeper_branch34_solaris/"
        }
    ],
    "mode": "EXCLUSIVE",
    "nodeDescription": "the master Jenkins node",
    "nodeName": "",
    "numExecutors": 0,
    "overallLoad": {},
    "primaryView": {
        "name": "All",
        "url": "https://builds.apache.org/"
    },
    "quietingDown": false,
    "slaveAgentPort": 0,
    "unlabeledLoad": {},
    "useCrumbs": true,
    "useSecurity": true,
    "views": [
        {
            "name": "All",
            "url": "https://builds.apache.org/"
        },
        {
            "name": "Hadoop",
            "url": "https://builds.apache.org/view/Hadoop/"
        }
    ]
};

module("Json parsing & JobCollection tests", {
    setup: function() {
        config.excludeFilter = [];
        config.includeFilter = [];
    }
});
test("All jobs are included", function(){

    var jobCollection = new JobsCollection();
    jobCollection.parse(json);
    equal(jobCollection.includedJobs.length, 8);
    equal(jobCollection.excludedJobs.length, 0);

});

test("Include filter jobs are included", function(){
    config.includeFilter = ["ACE-trunk","ActiveMQ"];
    var jobCollection = new JobsCollection();
    jobCollection.parse(json);
    equal(jobCollection.includedJobs.length, 2);
    equal(jobCollection.excludedJobs.length, 6);

});

test("Exclude filter jobs are excluded", function(){
    config.excludeFilter = ["ACE-trunk","ActiveMQ"];
    var jobCollection = new JobsCollection();
    jobCollection.parse(json);
    equal(jobCollection.includedJobs.length, 6);
    equal(jobCollection.excludedJobs.length, 2);

});

test("Exclude and include filters work together", function(){
    config.excludeFilter = ["ACE-trunk"];
    config.includeFilter = ["ACE-trunk","ActiveMQ"];
    var jobCollection = new JobsCollection();
    jobCollection.parse(json);
    equal(jobCollection.includedJobs.length, 1);
    equal(jobCollection.excludedJobs.length, 7);

});


test("Exclude and include filters work together 2", function(){
    config.excludeFilter = ["ACE-trunk","ActiveMQ"];
    config.includeFilter = ["ACE-trunk"];
    var jobCollection = new JobsCollection();
    jobCollection.parse(json);
    equal(jobCollection.includedJobs.length, 0);
    equal(jobCollection.excludedJobs.length, 8);

});

test("Job model accepts Jenkins JSON API data", function(){
    config.includeFilter = ["ACE-trunk"];
    var jobCollection = new JobsCollection();
    jobCollection.parse(json);
    equal(jobCollection.includedJobs.length, 1);
    var job = jobCollection.includedJobs[0];
    ok(job);
    equal("yellow",job.color);
    equal("ACE-trunk",job.name);
    equal("https://builds.apache.org/job/ACE-trunk/",job.url);
});

