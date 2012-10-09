// This is our application's namespace
// http://ricostacruz.com/backbone-patterns/#namespace_convention
window.JR = {
};

// This is our applications logging
LOG = {
    defaultConfigForLogging: {
        trace: false,
        debug: false,
        info: false,
        warn: false,
        error: false
    },
    getConfig: function(){
        return loggingConfig || defaultConfigForLogging;
    },
    isTraceEnabled: function(){
        return this.getConfig().trace || this.defaultConfigForLogging.trace;
    },
    isDebugEnabled: function(){
        return this.getConfig().debug || this.defaultConfigForLogging.debug;
    },
    isInfoEnabled: function(){
        return this.getConfig().info || this.defaultConfigForLogging.info;
    },
    isWarnEnabled: function(){
        return this.getConfig().warn || this.defaultConfigForLogging.warn;
    },
    isErrorEnabled: function(){
        return this.getConfig().error || this.defaultConfigForLogging.error;
    },
    trace: function(message){
        this.isTraceEnabled() && console.log(message);
    },
    debug: function(message){
        this.isDebugEnabled() && console.log(message);
    },
    info: function(message){
        this.isInfoEnabled() && console.log(message);
    },
    warn: function(message){
        this.isWarnEnabled() && console.log(message);
    },
    error: function(message){
        this.isErrorEnabled() && console.log(message);
    }
}