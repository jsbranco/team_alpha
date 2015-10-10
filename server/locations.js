function getLongLatForAddress (address, callback) {
  var result = HTTP.call(
    "GET",
    "https://maps.googleapis.com/maps/api/geocode/json",
    { params: {
      address: address,
      key: "AIzaSyC5nDYF3ugYdGvTN_y-D0-R52_ap6Wobn4"
    }}
  );

  console.log(result.data.results[0]);

  if (result.data.status == "OK") {
    var locationData = {
      point: result.data.results[0].geometry.location,
      address: result.data.results[0].formatted_address
    };
    callback(null, locationData);
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
      throw new Meteor.Error("not-logged-in", "You must be logged in to add a location.");
    }

    // Grab long & lat and insert location to user's array
    var point, formattedAddress, returnJSON;
    getLongLatForAddress(address, function(error, location) {
      if(error) {
        throw new Meteor.Error("long-lat-error", error);
      } else {
        point = location.point;
        formattedAddress = location.address;
      }
    });

    if (point !== null) {
      var userLocations = Meteor.user().profile.locations;
      userLocations.push({
        name: name,
        address: formattedAddress,
        longitude: point.lng,
        latitude: point.lat,
        tags: tags
      });

      Meteor.users.update({_id: this.userId}, {$set: {"profile.locations": userLocations}});

      returnJSON = {message: "Location added!", status: "success"};
    } else {
      throw new Meteor.Error("unknown-error", "An unknown error has occurred.....");
    }

    return returnJSON;
  },
  getTripRecommendation: function() {
    if (!this.userId) {
      throw new Meteor.Error("not-logged-in", "You must be logged in to get a trip recommendation.");
    }

    var userLocations = Meteor.user().profile.locations;
    var numberOfLocations = userLocations.length;
    var responseMessage = "User has " + numberOfLocations + " locations.";

    var returnJSON = {message: responseMessage, status: "success"};
    return returnJSON;
  }
});
