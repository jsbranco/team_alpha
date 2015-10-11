Template.forgotPassword.events({
    'submit #forgotForm': function (e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget);
        Meteor.call("sanitizeEmail", forgotPasswordForm.find('#email').val().toLowerCase(), function (err, email) {


            if (email) {

                Accounts.forgotPassword({email: email}, function (err) {
                    if (err) {
                        if (err.message === 'User not found [403]') {
                            Notifications.error("Email not found", 'This email does not exist.');
                        } else {
                            Notifications.error("Oooooops", 'Something went wrong ...');
                        }
                    } else {
                        Notifications.success("Yay!", 'Email sent!');
                    }
                });

            }

            return false;
        });

    }
});

Template.forgotPassword.onRendered(function () {

    $("#forgotForm").validate({
        rules: {
            email: {
                required: true,
                verified: false
            }
        },
        messages: {
            email: {
                required: "You need to input an email"
            }
        }
    })
})


Template.resetPassword.helpers({
    resetPassword: function () {
        return Session.get('resetPassword');
    }
});
//
Template.resetPassword.events({
    'submit #resetForm': function (e, t) {
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#password').val(),
            passwordConfirm = resetPasswordForm.find('#cpassword').val();
        if(password != passwordConfirm)
        {
            Notifications.error("Password Mismatch" ,"Your passwords do not match");
            return;
        }
        Accounts.resetPassword(Session.get('resetPassword'), password, function (err) {
            if (err) {
                Notifications.error("Ooops" ,"We are sorry but something went wrong.");
            } else {
                Notifications.success("Done!", "Your password has been changed. Welcome back!");
                Session.set('resetPassword', null);
            }
        });
        return false;
    }
});

Template.resetPassword.onRendered(function()
{
    if (Accounts._resetPasswordToken) {
        Session.set('resetPassword', Accounts._resetPasswordToken);
    }
    $("#resetForm").validate({
        rules:
        {
            password:{
                required:true,
                minlength:6
            },
            cpassword:
            {
                required:true,
                minlength:6
            }
        },
        messages:{
            password:{
                required:"You need to enter a new password",
                minlength:"Your password has to be at least 6 characters"
            },
            cpassword:
            {
                required:"You need to re-enter your new password",
                minlength:"Your password has to be at least 6 characters"

            }
        }
    })
})