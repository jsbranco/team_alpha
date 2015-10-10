$("body").on("focus", "#searchInput", function() {
	
});

console.log("boo");

Template.search.events({
	"focus #searchInput": function() {
		console.log("hello");
	}
});