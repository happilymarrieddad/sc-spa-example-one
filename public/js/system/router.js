$(function() {

	var type_id;
	var customer_id;

	bindlock++;
	startlock++;

	var started = false;

	observe("bind", function() {

		function routerMiddleware() {
			notify("start-loading");
			var hash = window.location.hash.slice(2);
			if (started) {
				notify("build-"+hash);
			}
		}

		var home = function() {};
		var profile = function() {};

		var router = Router({
			"/" : home,
			"/home" : home,
			"/profile" : profile
		});

		router.configure({
			on: routerMiddleware
		});

		router.init();
		notify("binding-finished");
	});

	observe("start", function() {

		notify('package-finished');
	});

	observe("start-loading", function() {
		$('section').hide();
		$(".whole-page").hide();
		$("#loading-page").show();
	});

	observe("finish-loading", function() {
		$("#loading-page").hide();
		$(".whole-page").show();
	});

	observe("finish-loading-application", function() {
		started = true;
		// Check for a routing path and if there is none reroute to home
		if (window.location.hash.slice(2).length < 1) {
			notify("start-loading");
			notify("build-home");
		}
		else {
			notify("build-home");
		}
	});

});