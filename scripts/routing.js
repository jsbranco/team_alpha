Router.configure({
    layoutTemplate: "nav-main-layout"
});

Router.plugin("auth", {
    except: [
        "login",
        "register",
        "forgotPassword",
        "resetPassword"
    ]
});

Router.route('/', {
    action: function () {
        this.render('search');
    },
    onAfterAction: function () {
        document.title = "Location Bookmark";
    }
});

Router.route("/following", {
  onAfterAction: function() {
    document.title = "Following";
  }
});

Router.route("/bookmarks", {
  action: function () {
    this.render("bookmarks", {
      data: function() {
        // Return locations for the logged in user
        var locations = Locations.find({
          userId: Meteor.userId(),
          loc: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [114.1665923, 22.3291652]
              }
            }
          }
        });
        console.log(locations.fetch());
        return locations;
      }
    });
  }
});

Router.route("/login", {
    layoutTemplate: "no-layout",
    onAfterAction: function () {
        document.title = "Login";
    }
});


Router.route("/logout", {
    action: function () {
        Meteor.logout(function () {
            Router.go("/login");
        });
    },
    onAfterAction: function () {
        document.title = "Logout";
    }
});

Router.route("/register", {
    layoutTemplate: "no-layout",
    onAfterAction: function () {
        document.title = "Register";
    }
});
Router.route("/resetPassword/:resetPasswordToken", {
    layoutTemplate: "no-layout",
    name: "resetPassword",
    onBeforeAction: function () {
        if (Meteor.userId()) {
            this.redirect('/search');
        } else {
            this.next();
        }
        Accounts._resetPasswordToken = this.params.resetPasswordToken;
    },
    onAfterAction: function () {
        document.title = "Reset Password";
    }
});
Router.route("/forgotPassword", {
    layoutTemplate: "no-layout",
    onAfterAction: function () {
        document.title = "Forgot Password";
    }
});

Router.route("/search", {
    action: function () {
        Router.go("/");
    }
});

Router.route("/user/:_id", {
  action: function() {
    this.render("bookmarks", {
      data: function() {
        // Return locations for the requested user
        var locations = Locations.find({
          userId: this.params._id,
          loc: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [114.1665923, 22.3291652]
              }
            }
          }
        });
        console.log(locations.fetch());
        return locations;
      }
    });
  }
});

var animateContentOut = function () {
        setTimeout(function () {
            $('.landing-form').removeClass("animated fadeIn");
        }, 10);
        this.next();
    },
    fadeContentIn = function () {
        setTimeout(function () {
            $('.landing-form').addClass("animated fadeIn");
        }, 10);
    };
// define this as a global onBeforeAction so it happens all the time
Router.onBeforeAction(animateContentOut);
Router.onAfterAction(fadeContentIn);
