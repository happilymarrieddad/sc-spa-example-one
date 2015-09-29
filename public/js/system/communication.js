$(function() {

	var queue = {};
	var debug = true;

	function log() {
		if (!debug) return;
		if (console && console.log) console.log(arguments);
	}

	function notify(event, data) {
        data = data || null;
        if (!queue.hasOwnProperty(event)) return log(event, 'nothing listening');
        $.each(queue[event], function (i, obj) {
            var ret = obj(data) || null;
            log(event, 'with', data, '=> ' + ret);
        });
        return true;
	}

	function observe(event, obj) {
		if (typeof event == 'object') {
			$.each(event, function(i, ev) {
				observe(ev, obj);
			});
		} else if (typeof event == 'string') {
			if (!queue.hasOwnProperty(event)) queue[event] = [];
			queue[event].push(obj);
		} else {
			log('Queue Reject', event);
		}
	}

	window.notify = notify;
	window.observe = observe;
	window.debug = debug;

	if (debug) window.queue = queue;

});