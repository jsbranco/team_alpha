Router.configure({
  layoutTemplate: "nav-main-layout"
});

Router.plugin("auth", {
  except: [
    "login",
    "register"
  ]
});

Router.route('/', {
  action: function () {
    this.render('search');
  },
  onAfterAction: function() {
    document.title = "Location Bookmark";
  }
});

Router.route("/bookmarks", {
  action: function() {
    this.render("search");
  },
  data: function() {
    return "bookmarks";
  }
});

Router.route("/login", {
  layoutTemplate: "no-layout",
  onAfterAction: function() {
    document.title = "Login";
  }
});

Router.route("/logout", {
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
  layoutTemplate: "no-layout",
  onAfterAction: function() {
    document.title = "Register";
  }
});

Router.route("/search", {
  action: function() {
    Router.go("/");
  }
});
