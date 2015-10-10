Template.addLocation.events({
  "click .addLocationButton": function() {
    console.log("adding location");
    Meteor.call("addLocation",
      "Apple",
      "1 Infinite Loop, Cupertino, CA",
      ["Technology", "Coolness"],
      function(error, result) {
        if(error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
    );
  },
  "click .getTripRecommendation": function() {
    Meteor.call("getTripRecommendation", function(error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  }
});

Template.addLocation.helpers({
  locations: function() {
    return Locations.find({
      loc: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [114.109497, 22.396428]
          }
        }
      }
    });
    /*return Meteor.users.find(
      { _id: Meteor.userId() },
      { username: 1, "profile.fullName": 0 }
    );*/
    /*return Meteor.users.aggregate([
      {$match: $near: { $geometry: { type: "Point", coordinates: [114.109497, 22.396428]}}},
      {$project: {_id: Meteor.userId()}}
    ]);*/
  }
});
