Template.login.helpers({
    username: "",
    loginMessage: Session.get("loginMessage")

});
Template.login.onRendered(function () {
    $('#loginForm').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            email: {
                required: "You must enter an email address."
            }
        }
    });
});

Template.login.events({
    'submit #loginForm': function (event, tpl) {
        event.preventDefault();

        var email = tpl.find("#email").value,
            password = tpl.find("#password").value;
        console.log("Email ", email);
        Meteor.call("sanitizeEmail", email, function (err, email) {
            if (err)
                Notifications.error('Failed to clean email', err.reason);

            Meteor.loginWithPassword(email, password, function (err) {
                if (err) {
                    Notifications.error('Authentication Failed', err.reason);
                    return;
                }
                else {
                    Router.go("/home");
                }
            });
        });
        return false;
    }
});

Template.login.events({
    'click #facebook-login': function (event) {
        Meteor.loginWithFacebook({requestPermissions: ['user_likes', 'email', 'user_friends', 'user_birthday']}, function (err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

    'click #logout': function (event) {
        Meteor.logout(function (err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        });
    }
});
