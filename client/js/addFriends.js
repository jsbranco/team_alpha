Template.addFriends.events({
  "click .addFriendButton": function(event) {
    var thisButton = $(event.target);
    var thisLI = thisButton.parent().parent("li");
    var users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
    var user = users[thisLI.index()];
    Meteor.call("followUser", user._id, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        Notifications.success("Following", "You are now following " + user.username + "!");
      }
    });
  }
});

Template.addFriends.helpers({
  isFollowingUser: function(userId) {
    var following = Meteor.user().profile.following;
    if(following.indexOf(userId) !== -1) {
      return true;
    } else {
      return false;
    }
  },
  users: function() {
    return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
  }
});
