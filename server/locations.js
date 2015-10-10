function getLongLatForAddress (address, callback) {
  var result = HTTP.call(
    "GET",
    "https://maps.googleapis.com/maps/api/geocode/json",
    { params: {
      address: address,
      key: "AIzaSyC5nDYF3ugYdGvTN_y-D0-R52_ap6Wobn4"
    }}
  );

  //console.log(result.data.results[0].geometry);

  if (result.data.status == "OK") {
    callback(null, result.data.results[0].geometry.location);
  } else {
    if (result.data.status == "ZERO_RESULTS") {
      callback("There was nothing found for that address.", "failure");
    } else if (result.data.status == "INVALID_REQUEST") {
      callback("You address may not be formatted correctly. Please check the address and try again.", "failure");
    } else {
      callback("An unknown error has occurred. Please try again.", "failure");
    }
  }
}

Meteor.methods({
  addLocation: function(name, address, tags) {
    check(name, String);
    check(address, String);
    check(tags, [String]);

    if (!this.userId) {
      throw new Meteor.Error("not-logged-in", "Must be logged in to add a location.");
    }

    // Grab long & lat and insert location to user's array
    var point, returnJSON;
    getLongLatForAddress(address, function(error, location) {
      if(error) {
        throw new Meteor.Error("long-lat-error", error);
      } else {
        point = location;
      }
    });

    if (point !== null) {
      var userLocations = Meteor.user().profile.locations;
      console.log(userLocations);
      userLocations.push({
        name: name,
        address: address,
        longitude: point.lng,
        latitude: point.lat,
        tags: tags
      });

      Meteor.users.update({_id: this.userId}, {$set: {"profile.locations": userLocations}});

      returnJSON = {message: "Location added!", status: "success"};
    } else {
      returnJSON = {message: "An unknown error has occured.....", status: "failure"};
    }

    return returnJSON;
  }
});
