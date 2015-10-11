Template.user.events({
  "click .followButton": function(event) {
    var thisButton = $(event.target);
    var userId = thisButton.val();
    var user = Meteor.users.findOne({ _id: userId });
    Meteor.call("followUser", userId, function(error, result) {
      if(error) {
        Notifications.error("Following Error", error);
      } else {
        Notifications.success("Following", "You are now following " + user.username + "!");
      }
    });
  },
  "click .unfollowButton": function(event) {
    var thisButton = $(event.target);
    var userId = thisButton.val();
    var user = Meteor.users.findOne({ _id: userId });
    Meteor.call("unfollowUser", userId, function(error, result) {
      if(error) {
        Notifications.error("Unfollowing Error", error);
      } else {
        Notifications.success("Unfollowed", "You have unfollowed " + user.username + ".");
      }
    });
  }
});

Template.following.helpers({
  userRows: function() {
    var users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
    var chunks = [];
    var size = 3;
    while (users.length > size) {
        chunks.push({ row: users.slice(0, size)});
        users = users.slice(size);
    }
    chunks.push({row: users});
    return chunks;
  }
});

Template.user.helpers({
  isFollowingUser: function(userId) {
    var following = Meteor.user().profile.following;
    if(following.indexOf(userId) !== -1) {
      return true;
    } else {
      return false;
    }
  }
});
