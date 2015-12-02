(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.dashboard')
        .config(
            [
                '$stateProvider',
                '$locationProvider',
                 cpConfigCommonSecureRoutes
            ]);

    function cpConfigCommonSecureRoutes ($stateProvider, $locationProvider) {
        $stateProvider.state('dashboard', {
            abstract: true,
            templateUrl: '/components/dashboard/main.html',
            data: {
                isSecure: true
            }
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    };

}());