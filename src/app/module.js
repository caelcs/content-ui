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
	 	).run(validateSecureUrls);

  	function validateSecureUrls ($rootScope, $state, $timeout, AccessToken) {
  		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
  			var isSecure = toState.data.isSecure;
  			if (!AccessToken.get()) {
  				AccessToken.set();
  			}
  			if (isSecure && !AccessToken.get()){
        		event.preventDefault(); 
        		$state.go('public.intro');
      		}
  		});
  	};
})();
