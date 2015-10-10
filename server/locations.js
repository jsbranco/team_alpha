function getLongLatForAddress (address, callback) {
  console.log("got address: " + address);
  var result = HTTP.call(
    "GET",
    "https://maps.googleapis.com/maps/api/geocode/json",
    { params: {
      address: address,
      key: "AIzaSyC5nDYF3ugYdGvTN_y-D0-R52_ap6Wobn4"
    }}
  );

  console.log(result.data.results[0].geometry);

  if (result.statusCode == 200 && result.data.results.length > 0) {
    callback(null, result.data.results[0].geometry.location);
  } else {
    if (result.data.status == "ZERO_RESULTS") {
      callback("There was nothing found for that address.", "failure");
    }
  }
}

Meteor.methods({
  addLocation: function(name, address, tags) {
    check(name, String);
    check(address, String);
    check(tags, Array);

    if (! this.userId) {
      throw new Meteor.Error("not-logged-in", "Must be logged in to add a location.");
    }

    // Grab long & lat and insert location to user's array
    var point, returnJSON;
    getLongLatForAddress(address, function(error, location) {
      if(error) {
        throw new Meteor.Error("error", error);
      } else {
        point = location;
      }
    });

    if (point !== null) {
      /*Locations.insert({
        name: name,
        address: address,
        longitude: point.lng,
        latitude: point.lat,
        tags: tags
      });*/

      returnJSON = {error: null, result: "Location added!"};
    } else {
      returnJSON = {error: "An unknown error has occured.....", result: "failure"};
    }

    return returnJSON;
  }
});
