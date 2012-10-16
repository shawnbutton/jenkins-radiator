JR.RadiatorTitleView = Backbone.View.extend({
    className: "build-health-wrapper row-fluid",
    initialize: function(){
      this.render();
    },
    render: function(){
        var template = '<div class="radiator-title-wrapper row-fluid">' +
            '<div class="span12 radiator-title">' +
            '<h1 id="radiatorTitle">{{radiatorTitle}}</h1>' +
            '</div>' +
            '<div id="radiator-loading-indicator"><img src="img/ajax-loader.gif"/></div>' +
            '</div>';
        var json = this.model;
        var output = Mustache.to_html(template, json);
        $(this.el).html(output);
        $('#title').html(this.el);
        $(document).attr('title',this.model.radiatorTitle);
        return this;
    }
});