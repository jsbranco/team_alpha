Meteor.methods({
    'followUser': function (userId) {
        var error;
        if (userId == undefined) {
            throw new Meteor.Error("user-id-missing", "User ID is required.");

        }
        if (Meteor.user().profile.following.indexOf(userId) >= 0) {
            throw new Meteor.Error("already-following", "Already following this user");
        }

        Meteor.users.update({_id: Meteor.user()._id}, {$push: {"profile.following": userId}}, function (err, doc) {
            if (err)
                throw new Meteor.Error("error-updating", err.message);
        })

    },
    'unfollowUser': function (userId) {
        if (userId == undefined) {
            throw new Meteor.Error("user-id-missing", "User ID is required.");
        }
        if (Meteor.user().profile.following.indexOf(userId) < 0) {
            throw new Meteor.Error("not-following-user", "User not in the 'following' list");
        }

        Meteor.users.update({_id: Meteor.user()._id}, {$pull: {"profile.following": userId}}, function (err, doc) {
            if (err)
                throw new Meteor.Error("error-updating", err.message);

        })
    }
})
