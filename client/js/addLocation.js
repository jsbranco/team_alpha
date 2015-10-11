Locations = new Meteor.Collection("locations");

Template.addLocation.events({
  "click .addLocationButton": function() {
    console.log("adding location");
    Meteor.call("addLocation",
      "Tim Ho Wan",
      "9 Fuk Wing St, Hong Kong",
      ["Food", "Chinese"],
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
            coordinates: [114.1665923, 22.3291652]
          }
        }
      }
    });
  }
});
