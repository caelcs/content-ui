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
				'restangular',
                'CopyshareContent.common.api',
				'CopyshareContent.public',
				'CopyshareContent.dashboard',
				'app.templates'
		])
	 	.config(
        [
            '$locationProvider', 
            '$urlRouterProvider',
            cpConfigDefault
        ])
        .config(
        [
            'OAuthConfigurationProvider', 
            '$httpProvider',
            cpConfigOAuthProvider
        ])
        .run(validateSecureUrls);

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

    function cpConfigOAuthProvider(OAuthConfigurationProvider, $httpProvider) {
        OAuthConfigurationProvider.init({
            protectedResources: ['http://localhost:8080']
        }, $httpProvider);
    };

    function cpConfigDefault($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
    };
})();
