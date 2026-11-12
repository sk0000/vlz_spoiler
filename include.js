(function () {
	var includeScript = document.currentScript;
	var baseUrl = includeScript ? includeScript.src : document.baseURI;

	var stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = new URL('css/vlz_spoiler.min.css', baseUrl).href;
	document.head.appendChild(stylesheet);

	if (!window.jQuery || window.$ !== window.jQuery) {
		console.error('VLZ spoiler: jQuery is not loaded or is not available as "$".');
		return;
	}

	var script = document.createElement('script');
	script.src = new URL('js/vlz_spoiler.min.js', baseUrl).href;
	document.head.appendChild(script);
})();