Meteor.autorun(function () {
    // Whenever this session variable changes, run this function.
    var message = Session.get('loginMessage');
    if (message) {
        ui.notify(message)
            .effect('slide')
            .closable();

        //Session.set('loginMessage', null);
    }
});

Template.login.helpers({
    username: ""    ,
    loginMessage: Session.get("loginMessage")

});

Template.login.events({
    'submit #loginForm': function (event, tpl) {
        var email = tpl.find("#email").value,
            password = tpl.find("#password").value
        console.log("Email ", email)

        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                Session.set("loginMessage", err.reason);
                return;
            }
            else {
                Router.go("/home");
            }
        });
        event.preventDefault();

        return false;
    }
});

Template.register.events({
    'submit #registerForm': function (e, tpl) {
        // Trim and validate the input
        var options = {
            username:tpl.find("#username").value,
            email:  tpl.find('#email').value,
            password: tpl.find('#password').value,
            profile: {
                fullName: tpl.find('#fullName').value,
                locations:[]
            }
        };

        Accounts.createUser(options, function (err) {
            if (err) {
                // Inform the user that account creation failed
            } else {
                Router.go("login");
            }

        });
        e.preventDefault();

        return false;
    }
});