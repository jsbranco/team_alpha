Template.register.events({
    'click #create-account': function (e, tpl) {
        // Trim and validate the input
        var username = tpl.find("#username").value,
            email = tpl.find('#email').value,
            password = tpl.find('#password').value,
            fullName = tpl.find('#fullName').value;

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
                // Inform the user that account creation failed
            } else {
                Router.go("login");
            }

        });
        e.preventDefault();

        return false;
    }
});

function sanitizeEmail(email) {
    return email.replace(/\s/g, "");
}
function validatePassword(password) {

    return password !== undefined && password.length > 6;
}
