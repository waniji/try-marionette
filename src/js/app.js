$(function(){

    // 大元のappインスタンスを作成
    var Manager = new Marionette.Application();

    var Region = Marionette.Region.extend({
      attachHtml: function(view){
        console.log("Atach Sareta!!!");
        this.$el.empty().append(view.el);
       }
     })

    Manager.addRegions({
        mainRegion: {
          regionClass: Region,
          selector: '#main-region'
        }
    });

    Manager.UserView = Marionette.ItemView.extend({
        template: '#user-form-template',
    });

    Manager.User = Backbone.Model.extend({
    });

    Manager.onStart = function(){

        // viewにセットするmodelのインスタンス
        var alice = new Manager.User({
                        firstName: 'Alice',
                        });

        // viewのインスタンス
        var aliceView = new Manager.UserView({
            model: alice
        });

        Manager.mainRegion.show(aliceView);

    };

    Manager.start();

});

