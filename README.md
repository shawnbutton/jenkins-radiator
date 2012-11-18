## Jenkins Radiator

An SPA (Single Page App) implemented with backbone.js that monitors your Jenkins CI build server and displays a radiator of failing,
passing, building, aborted, unstable and disabled jobs. Audio is played when jobs move from a passing state to a failing state
or from a failing state to a passing state.

Supports configuring multiple radiators for showing different jobs.


### Installation

1. Download a [zip of the project](https://github.com/kogitant/jenkins-radiator/downloads)
2. Extract that zip
3. Open `index.html` in a modern browser

You should now see the help page of Jenkins Radiator that showcases how it can be configured.
By default the Jenkins Radiator displays jobs from Apache's public Jenkins and a few other public Jenkinses too.

But you'll want to configure Jenkins Radiator for your own purposes. See below for instructions.


### Jenkins server & network environment requirements 
The only requirement of Jenkins Radiator is that the Jenkins Server you want to use as data source is either public or available in the network
where you will run Jenkins Radiator. 

If your company has Jenkins runing in the internal network, then you'll have to run Jenkins Radiator in the same network.
Jenkins provides the necessary JSON API out of the box, so no configuration is needed in Jenkins to use Jenkins Radiator.

If your Jenkins requires logini and does not provide any kind of anonymous access, Jenkins Radiator cannot access the JSON API.
I suggest that you configure Jenkins so that an anonymous user can only view things and everything else requires login. This also exposes the JSON API 
and now you are able to use Jenkins Radiator.


### Configuration

1. Edit `config.js` and update the `ci_json_url` to point to your Jenkins instance
2. Open `index.html` in a browser

### Optional Configuration

* Edit `config.js` and set the `refresh_interval` to something other than 1 minute
* If your Jenkins has multiple jobs and your only interested in some of them, configure the include and exclude filters
* If you want to display multiple radiators of different projects on a screen, you can configure them all in the config.js.
    * Set radiatorTitle to identify them from each other
    * Open index.html?config=3 to view the radiator number 4 etc.


### Usage tips
A setup of Firefox with Tab Slideshow plugin is a really easy way to setup a monitor that shows different configurations of the Jenkins Radiator.


### Screenshots

Coming soon.

### Improvement ideas
Following things could be implemented:
1. Timestamp to inform what point in time is being displayed
2. Counter (of seconds) until next refresh


### History of Jenkins Radiator
Jenkins Radiator was originally implemented by Clayton (https://github.com/clayton/jenkins-radiator). That was a nice starting point, which I've developed further by adding things like support for multiple configurations, all builds list view, help view which provides links to all configured radiators etc.
The original implementation by Clayton has been mostly rewritten by me in order to learn about Backbone, Backbone Relational and all the other technologies used in this project. Clayton's original project didn't also include any tests. I've implemented a few, trying to learn QUnit while doing so.

