(function() {
	'use strict';

	angular
		.module('CopyshareContent', 
			[
				'ui.bootstrap', 
				'ui.router', 
				'ngCookies', 
				'ngAnimate',
				'oauth',
				'CopyshareContent.public',
				'CopyshareContent.dashboard',
				'app.templates'
			]
		);
})();
