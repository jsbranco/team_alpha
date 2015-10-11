Meteor.startup(function () {

});
Meteor.methods({
    'sanitizeEmail': sanitizeEmail,
    'validatePassword': validatePassword
});

function sanitizeEmail(email) {
    return email.replace(/\s/g, "");
}
function validatePassword(password) {

    return password !== undefined && password.length > 6;
}
