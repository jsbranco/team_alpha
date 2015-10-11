Template.bgColor.events({
  "click .toggleBG": function() {
    console.log($(".backgroundMap").css("opacity"));
    if($(".backgroundMap").css("opacity") !== "0") {
      console.log("hide map");
      $(".backgroundMap").css("opacity", 0);
      $(".backgroundColor").css("opacity", 1);
    } else {
      console.log("show map");
      $(".backgroundMap").css("opacity", 1);
      $(".backgroundColor").css("opacity", 0);
    }
  }
  gi
});
