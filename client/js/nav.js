$(document).ready(function () {
    console.log($(".drawer"));
    $(".drawer").drawer();
});

Template.nav.events({
    "click .drawer-hamburger": function () {
        console.log("buttonclicked");
        $(".drawer").drawer("toggle");
        $(".drawer-hamburger").hide();
    },
    "click .closeButton": function () {
        console.log("closeclicked");
        $(".drawer").drawer("toggle");
        $(".drawer-hamburger").show();
    },
    "click .drawer-menu  li a": function () {
        $(".drawer").drawer("toggle");
        $(".drawer-hamburger").show();

    },
    "drawer.closed .drawer": function () {
        console.log("closed")
    },
    "drawer.opened .drawer": function () {
        console.log("opened")
    }
});