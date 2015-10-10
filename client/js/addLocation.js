Template.addLocation.events({
  "click .addLocationButton": function() {
    console.log("adding location");
    Meteor.call("addLocation",
      "Google Inc.",
      "1600 Amphitheatre Parkway, Mountain View, CA 94043",
      ["Technology", "Coolness"],
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
    );
  }
});
