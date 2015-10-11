Meteor.startup(function () {
    Accounts.urls.resetPassword = function (token) {
        return Meteor.absoluteUrl('resetPassword/' + token);
    };
    var smtp = {
        username: 'teamalphameteor@gmail.com',   // eg: server@gentlenode.com
        password: 'JaJuJuRy',   // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.gmail.com',  // eg: mail.gandi.net
        port: 25
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

});
Meteor.methods({
    'sanitizeEmail': sanitizeEmail,
    'validatePassword': validatePassword
});

Accounts.onCreateUser(function(options, user)
{
    console.log("user :", JSON.stringify(user));
    user.friends = [];
    return user;
})
function sanitizeEmail(email) {
    return email.replace(/\s/g, "");
}
function validatePassword(password) {

    return password !== undefined && password.length > 6;
}