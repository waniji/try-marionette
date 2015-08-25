var Router = require('./router/router');
var TopLayout = require('./view/top');
var Sidebar = require('./view/sidebar');

Manager = new Marionette.Application();

Manager.addRegions({
    main:  '#main'
});

Manager.addInitializer(function(){
    new Router();
});

Manager.onStart = function(){
    if (Backbone.history) {
        Backbone.history.start();
    }
};

Manager.main.show(new TopLayout());
Manager.main.currentView.sidebar.show(new Sidebar());

Manager.start();
