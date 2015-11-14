(function() {
    'use strict';
    /**
     * Route configuration for the public content.
     */
    angular
        .module('CopyshareContent.public')
        .config(
            [
                '$stateProvider',
                '$locationProvider',
                 cpConfigCommonPublicRoutes
            ]);

    function cpConfigCommonPublicRoutes ($stateProvider, $locationProvider) {       
        $stateProvider.state('public', {
            abstract: true,
            templateUrl: '/components/public/main.html'
        });

        $stateProvider.state('public.index', {
            url: '/',
            templateUrl: '/components/public/intro/intro.html'
        });

        $locationProvider.html5Mode(true);
    };

}());