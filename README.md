## Jenkins CI Radiator

A backbone.js application that monitors your Jenkins CI build server and displays a radiator of failing,
passing, building and disabled jobs. Audio is played when jobs move from a passing state to a failing state
or from a failing state to a passing state.

## TODO
1. Audio
2. Performance
3. Title
4. Heart shape
5. Disabled, aborted etc. builds in radiator
6. Progress bars etc. to inform user that something is happening
7. Timestamp to inform what point in time is being displayed
8. Counter (of seconds) until next refresh

Not in that particular order

### Installation

1. Download a [zip of the project](https://github.com/kogitant/jenkins-radiator/downloads)
2. Extract that zip
3. Configure the radiator (see below)
4. Open `index.html` in Opera, Chrome or another modern browser

### Configuration

1. Edit `config.js` and update the `ci_json_url` to point to your Jenkins instance
2. Open `index.html` in Chrome or Safari

### Optional Configuration

* Edit `config.js` and set the `refresh_interval` to something other than 1 minute
* If your Jenkins has multiple jobs and your only interested in some of them, configure the include and exclude filters
* If you want to display multiple radiators of different projects on a screen, you can configure them all in the config.js.
    * Set radiatorTitle to identify them from each other
    * Open index.html?config=3 to view the radiator number 4 etc.

### Screenshots

Coming soon.