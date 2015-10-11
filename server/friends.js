Meteor.methods({
    'addFriend': function (friendID) {
        var error;
        if (friendID == undefined) {
            throw new Meteor.Error("friend-id-missing", "Friend's ID is required.");

        }
        Meteor.users.find({'friends': {$in: [friendID]}}, function (err, cursor) {
            var docs = cursor.find().toArray();
            if (docs.length > 0) {
                throw new Meteor.Error("already-friended", err.message);
            }

            Meteor.users.update({_id: Meteor.user()._id}, {$push: {"friends": friendID}}, function (err, doc) {
                if (err)
                    throw new Meteor.Error("error-updating", err.message);

            })
        })

    }
})