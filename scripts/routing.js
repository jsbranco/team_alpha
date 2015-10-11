Router.configure({
    layoutTemplate: "nav-main-layout"
});

Router.route('/', function () {
    this.render('search');
});

Router.route('/addLocation');
Router.route('/saveLocation');
Router.route("/home");
Router.route("/landing");
Router.route("/login", {
    layoutTemplate: "no-layout"
});
Router.route("/register", {
    layoutTemplate: "no-layout"
});

var animateContentOut = function () {
        setTimeout(function () {
            $('.landing-form').removeClass("animated fadeIn");
        },10);
        this.next()
    },
    fadeContentIn = function () {
        setTimeout(function () {
            $('.landing-form').addClass("animated fadeIn");
        },10);
    }
// define this as a global onBeforeAction so it happens all the time
Router.onBeforeAction(animateContentOut)
Router.onAfterAction(fadeContentIn)