if (Meteor.isClient) {
  Locations = new Mongo.Collection("locations");
  // counter starts at 0
  Session.setDefault('counter', 0);

  Meteor.call("addLocation",
    "Eiffel Tower",
    "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
    ["Monuments", "Tall"],
    function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    }
  );

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
