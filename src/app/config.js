(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent', [])
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
        ]);

    function cpConfigOAuthProvider(OAuthConfigurationProvider, $httpProvider) {
        OAuthConfigurationProvider.init({
            protectedResources: ['http://localhost:8080']
        }, $httpProvider);
    };

    function cpConfigDefault($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
    };
}());