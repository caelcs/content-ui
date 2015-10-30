(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular.module('CopyshareContent').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('intro', {
            url: '/',
            templateUrl: '/components/dashboard/intro/intro.html'
        });
    }]);
}());