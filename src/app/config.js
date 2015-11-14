(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent', []),
        .config(
            [
                '$locationProvider',
                '$urlRouterProvider',
                 cpConfigDefault
            ]);

    function cpConfigDefault ($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    };
}());