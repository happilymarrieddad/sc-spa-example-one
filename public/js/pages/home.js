$(function() {

	var display = {};

	bindlock++;
	startlock++;

	// Binds all the elements on the page to variables
	observe("bind", function() {


		notify('binding-finished');
	});

	observe("start", function() {


		notify('package-finished');
	});

	observe("build-home", function() {


		
		notify("finish-loading");
		$("section[data-route=\"home\"]").show();
	});

});