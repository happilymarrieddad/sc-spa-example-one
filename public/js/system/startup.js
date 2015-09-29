$(function() {

	var display = {};
	var errors = 0;

	bindlock++;
	startlock++;

	observe("bind", function() {
		display.loadingPage = $("#loading-page");
		display.wholePage = $("#whole-page");
		notify("binding-finished");
	});

	observe("start", function() {
		
		
		notify("package-finished");
	});

	observe("binding-finished", function() {
		bindlock--;
		if (bindlock < 1) notify("start");
	});

	observe("package-finished", function() {
		startlock--;
		if (startlock < 1 && errors <= 5) {
			notify('initialize-libraries');
			notify("finish-loading-application");
		}
	});

	observe("check-bindlock", function() {
		if (errors > 5) {
			$("#loading-page").append($("<p class='text-danger text-center'>Failed to bind application assets. Please contact an administrator</p>"));
		} else if (bindlock) {
			errors++;
			setTimeout(function() {
				notify("check-bindlock");
			},500);
		} else {
			errors = 0;
			notify("check-startlock");
		}
	});

	observe("check-startlock", function() {
		if (errors > 5) {
			$("#loading-page").append($("<p class='text-danger text-center'>Failed to start up application. Please contact an administrator</p>"));
		} else if (startlock) {
			errors++;
			setTimeout(function() {
				notify("check-startlock");
			},2000);
		}
	});

	// This is where you can initialize all your cool jquery libraries and what not
	observe('initialize-libraries', function() {
		
	});

});

$(document).ready(function() {
	notify("bind");
	notify("check-bindlock");
});