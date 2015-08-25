var User = require('../model/user');
var Users = require('../collection/users');
var ShowUserView = require('../view/show_user');
var ListUsersView = require('../view/list_users');
var UserView = require('../view/user');
var Data = require('../data');

module.exports = Marionette.AppRouter.extend({
    routes: {
        "": "users",
        "users": "users",
        "users/new": "createUser",
        "users/:id": "showUser",
        "users/:id/edit": "editUser"
    },

    users: function() {
        var users = new Users(Data.users);

        var listUsersView = new ListUsersView({
            collection: users,
            childView: UserView
        });

        Manager.main.currentView.contents.show(listUsersView);
    },

    showUser: function(id) {
        user = new User(Data.users[id-1]);
        userView = new ShowUserView({ model: user });

        Manager.main.currentView.contents.show(userView);
    },

    editUser: function(id) {
    }
});

