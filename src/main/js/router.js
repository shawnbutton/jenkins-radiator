var AppRouter = Backbone.Router.extend({
    routes: {
        "":"home"
    },

    home:function(){
    	this.selectConfig();
    	this.renderTitle();
        var jobList = new JobsCollection();
        var radiatorView = new RadiatorView({"collection":jobList});
        jobList.fetch({success: function(){
            radiatorView.render();
        }});
        var fetchAndDisplay = function(){
            setTimeout(function(){
                jobList.fetch({success: function(){
                    radiatorView.render();
                }});
                fetchAndDisplay();
            }, config.refresh_interval);
        }
        fetchAndDisplay();
    },
    
    renderTitle:function(){
	    $("#radiatorTitle").html(config.radiatorTitle);
	    $(document).attr('title',config.radiatorTitle);
    },
    
    selectConfig: function(){
    	var idx=parseInt(this.getRequestParameter("config"), 10);
    	if(idx){
    		if(idx>=configs.length){
    			idx=0;
    		}else if(idx<0){
    			idx=0;
    		}
    		config = configs[idx];
    	}
    },
    
    getRequestParameter: function(paramName) {
    	  var searchString = window.location.search.substring(1),
    	      i, val, params = searchString.split("&");

    	  for (i=0;i<params.length;i++) {
    	    val = params[i].split("=");
    	    if (val[0] == paramName) {
    	      return unescape(val[1]);
    	    }
    	  }
    	  return null;
    }    
});