module.exports = Marionette.LayoutView.extend({
    template: require('../../template/top.hbs'),
    regions: {
        sidebar: "#sidebar",
        contents: "#contents"
    }
});

