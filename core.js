function load(file, callback, context) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'js/' + file + '.js';

	if (typeof callback === 'function') {
		context = context || window;
		script.onload = function() {
			callback.call(context);
		}
	} else if (typeof callback === 'string') {
		script.onload = function() {
			load(callback);
		}
	}

	load.head.appendChild(script);
}
load.head = document.getElementsByTagName('head')[0];



//To use
load('config', function() {
	//jquery.ui has dependency on lib/jquery
	load('lib/jquery', 'lib/jquery.ui');

	//While lib/socket.io has no reliance on the above files, it can be loaded parallelly.
	load('lib/socket.io', function() {
		//After lib/socket.io has been loaded, chat and initUI are loaded sequentially.
		load('chat', 'initUI');
	});
});