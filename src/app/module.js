(function() {
	'use strict';

	angular
		.module('CopyshareContent', [
				'ui.bootstrap', 
				'ui.router', 
				'ngCookies', 
				'ngAnimate',
				'oauth',
				'restangular',
                'angular-clipboard',
                'ui-notification',
                'CopyshareContent.constants',
                'CopyshareContent.common.api',
				'CopyshareContent.public',
				'CopyshareContent.dashboard',
				'app.templates'
		])
	 	.config([
            '$locationProvider', 
            '$urlRouterProvider',
            cpConfigDefault
        ])
        .config([
            'OAuthConfigurationProvider', 
            '$httpProvider',
            cpConfigOAuthProvider
        ])
        .config([
            'NotificationProvider', 
            cpConfigNotifications
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

            if (isSecure && AccessToken.get()) {
                var current = new Date().valueOf();
                var tokenDate = new Date(AccessToken.get().expires_at).valueOf();
                if (current > tokenDate) {
                    console.log('No longer valid. Token Expired');
                    event.preventDefault();
                    $state.go('public.intro');
                };
            }
        });
    };

    function cpConfigOAuthProvider(OAuthConfigurationProvider, $httpProvider, apiUrl) {
        OAuthConfigurationProvider.init({
            protectedResources: [apiUrl]
        }, $httpProvider);
    };

    function cpConfigDefault($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
    };

    function cpConfigNotifications(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 80,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });
    };
})();
