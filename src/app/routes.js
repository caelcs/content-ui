(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent')
        .config(
            [
                '$stateProvider',
                 '$urlRouterProvider', 
                 cpStateProviders
            ]
    );

    function cpStateProviders ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('index', {
            url: '/',
            templateUrl: '/components/dashboard/intro/intro.html'
        });

        $stateProvider.state('intro', {
            url: '/intro',
            templateUrl: '/components/dashboard/intro/intro.html'
        });

        $stateProvider.state('services', {
            url: '/services',
            templateUrl: '/components/dashboard/services/services.html'
        });

        $stateProvider.state('about', {
            url: '/about',
            templateUrl: '/components/dashboard/about/about.html'
        });

        $stateProvider.state('portfolio', {
            url: '/portfolio',
            templateUrl: '/components/dashboard/portfolio/portfolio.html'
        });

        $stateProvider.state('team', {
            url: '/team',
            templateUrl: '/components/dashboard/team/team.html'
        });

        $stateProvider.state('contact', {
            url: '/contact',
            templateUrl: '/components/dashboard/contact/contact.html'
        });
    };

}());