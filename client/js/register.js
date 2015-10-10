Template.register.onRendered(function () {
    $('#registerForm').validate({
        rules: {
            fullName: {
                required: true
            },
            username: {
                required: true
            },
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
            },
            fullName: {
                required: "You must enter your name"
            },
            username: {
                required: "You must enter an username"
            },
            password: {
                required: "You must enter a password"
            }
        }
    });
});
Template.register.events({
    'click .sign-in': function (e, tpl) {
        Router.go("/login");
    },
    'submit form': function (e, tpl) {
        e.preventDefault();

        var username = tpl.find("#username").value,
            email = tpl.find('#email').value,
            password = tpl.find('#password').value,
            fullName = tpl.find('#fullName').value;
        Meteor.call("sanitizeEmail", email, function (err, email) {


            var options = {
                username: username,
                email: email,
                password: password,
                profile: {
                    fullName: fullName,
                    locations: []
                }
            };

            Accounts.createUser(options, function (err) {
                if (err) {
                    Notifications.error('Registration failed', err.reason);

                    // Inform the user that account creation failed
                } else {
                    Router.go("login");
                }

            });

            return false;
        })
    }
});

function sanitizeEmail(email) {
    return email.replace(/\s/g, "")
}
function validatePassword(password) {

    return password !== undefined && password.length > 6;
}