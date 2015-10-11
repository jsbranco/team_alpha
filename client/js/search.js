if (Meteor.isClient) {
  //maps

  Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyDuzmJjjF_AFYTyUrHb_-eIwsbPAfoUpeA',
    libraries: 'places'  // also accepts an array if you need more than one
  });
});

  Template.search.helpers ({

  exampleMapOptions: function() {
    // Make sure the maps API has loaded

      if (GoogleMaps.loaded()) {
        // Map initialization options

        // var input = document.getElementById('#searchInput');
        // var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 16
        };
      }
    }
  });

  	Template.search.onRendered(function() {
  		this.autorun(function () {
  			if (GoogleMaps.loaded()) {
  				$("#searchInput").geocomplete({details:"form"});
  			}
  		});
  	});

	Template.search.events({
	    'click #searchButton': function(){
	        // code goes here
	    	$(".map-container").show();
	    	$(".customButtonDiv").show();
	        codeAddress();
	    },
	    "click #saveButton": function() {
	      // code goes here

	      console.log("saved!.. lol not really");

	      // get location name, tags and lat/lon
	      $("#locName").val();
	      $("#locTags").val();
	    },
	   //  'focusout #searchInput': function(){
	  	// 	console.log("hello");
	  	// 	$("#searchInputDiv").animate({
	  	// 		top: '+=275'
	  	// 	});
	  	// },
      'focus #searchInput': function(){
	  		$(".map-container").hide();
	  		$(".customButtonDiv").hide();
	  		$("#searchInputDiv").addClass("animate");

	  	},
        //'blur #searchInput': function(){
        //    $(".map-container").show();
        //    $(".customButtonDiv").show();
        //    $("#searchInputDiv").removeClass("animate");
        //
        //},
	  	'change #searchInput': function(){
	  		if ($("#searchInput").val().length > 1) {
	  			console.log("true");
	  		}
	  	}
	});


    Template.search.events({
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
      $(".pac-item").click(function()
      {

      });
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
