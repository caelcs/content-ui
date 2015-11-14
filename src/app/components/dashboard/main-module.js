(function() {
	'use strict';

	angular
		.module('CopyshareContent.dashboard', 
			[
				"CopyshareContent.dashboard.check",
				"CopyshareContent.dashboard.history",
				"CopyshareContent.dashboard.share"
			]
		);
})();
