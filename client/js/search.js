if (Meteor.isClient) {
  //maps

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.saveLocation.helpers ({

  exampleMapOptions: function() {
    // Make sure the maps API has loaded

      if (GoogleMaps.loaded()) {
        // Map initialization options

        // var input = document.getElementById('#searchInput');
        // var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });

  Template.search.events({
    'click .searchButton': function(){
        // code goes here

    // $(".map-container").show();
        codeAddress();

      }
  });

    Template.saveLocation.events({
    'click #saveButton': function(){
        // code goes here
        console.log("saved!.. lol not really");
      // get location name, tags and lat/lon
      $("#locName").val();
      $("#locTags").val();
    }
  });

}

function codeAddress() {
  var geocoder = new google.maps.Geocoder();
          // var map = myMap;
  var address = $("#searchInput").val();
  console.log("address = " + address);
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      var myMap = GoogleMaps.maps.exampleMap.instance;

      myMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: myMap,
        position: results[0].geometry.location
      });

      console.log(marker);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
