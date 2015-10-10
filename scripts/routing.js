Router.configure({
  layoutTemplate: "nav-main-layout"
});

Router.plugin("auth", {
  except: [
    "login",
    "register"
  ]
});

Router.route('/');

Router.route('/addLocation');

Router.route("/home");

Router.route("/landing");

Router.route("/login", {
  layoutTemplate: "no-layout"
});

Router.route("/logout", {
  name: "logout",
  action: function() {
    Meteor.logout(function() {
      Router.go("/login");
    });
  },
  onAfterAction: function() {
    document.title = "Logout";
  }
});

Router.route("/register", {
  layoutTemplate: "no-layout"
});

Router.route("/search");
