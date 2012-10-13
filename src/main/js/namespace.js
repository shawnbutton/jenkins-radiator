// This is our application's namespace
// http://ricostacruz.com/backbone-patterns/#namespace_convention
window.JR = {
};


var LOG = log4javascript.getLogger();

// Create a PopUpAppender with default options
var consoleAppender = new log4javascript.BrowserConsoleAppender();

// Set layout of appender
var layout = new log4javascript.PatternLayout("%d [%-5p] %m");
consoleAppender.setLayout(layout);

// Add the appender to the logger
LOG.addAppender(consoleAppender);

// Set level
LOG.setLevel(log4javascript.Level.INFO);
