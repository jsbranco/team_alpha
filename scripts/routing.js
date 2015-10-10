Router.configure({
  layoutTemplate: "nav-main-layout"
});

Router.route('/', function () {
  this.render('hello');
});

Router.route('/addLocation');
Router.route("/landing");
Router.route("/login", {
  layoutTemplate: "no-layout"
});
Router.route("/register", {
  layoutTemplate: "no-layout"
});
Router.route("/home");
