Template.addLocation.events({
  "click .addLocationButton": function() {
    console.log("adding location");
    Meteor.call("addLocation",
      "Apple",
      "1 Infinite Loop Cupertino, CA",
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
