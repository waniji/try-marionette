var Router = require('./router/router');

Manager = new Marionette.Application();

Manager.addRegions({
    mainRegion:  '#main-region'
});

Manager.addInitializer(function(){
    new Router();
});

Manager.onStart = function(){
    if (Backbone.history) {
        Backbone.history.start();
    }
};

Manager.start();
