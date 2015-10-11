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

Router.route("/bookmarks", {
    action: function () {
        this.render("search");
    },
    data: function () {
        return "bookmarks";
    }
});

<<<<<<< HEAD
Router.route('/addLocation');
Router.route('/saveLocation');
Router.route("/home");
Router.route("/landing");
=======
>>>>>>> db394c91fd2eabe82565011851cebfa34fea5cf9
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
