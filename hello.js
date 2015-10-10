if (Meteor.isClient) {
  Locations = new Mongo.Collection("locations");
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    locations: function() {
      return Locations.find({});
    },
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
