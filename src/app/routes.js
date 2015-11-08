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
                 cpConfigStateProviders
            ])
        .config(['$locationProvider',cpConfigLocationProvider]);

    function cpConfigLocationProvider ($locationProvider) {
        $locationProvider.html5Mode(true);      
    };

    function cpConfigStateProviders ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');

        /** PUBLIC site **/
        $stateProvider.state('public', {
            abstract: true,
            templateUrl: '/components/public/main.html'
        });

        $stateProvider.state('public.index', {
            url: '/',
            templateUrl: '/components/public/intro/intro.html'
        });

        $stateProvider.state('public.intro', {
            url: '/intro',
            templateUrl: '/components/public/intro/intro.html'
        });

        $stateProvider.state('public.about', {
            url: '/about',
            templateUrl: '/components/public/about/about.html'
        });

        $stateProvider.state('public.team', {
            url: '/team',
            templateUrl: '/components/public/team/team.html'
        });

        $stateProvider.state('public.contact', {
            url: '/contact',
            templateUrl: '/components/public/contact/contact.html'
        });
        /** END PUBLIC site **/

        /** SECURE site **/
        $stateProvider.state('dashboard', {
            abstract: true,
            templateUrl: '/components/dashboard/main.html'
        });

        $stateProvider.state('dashboard.check', {
            url: '/dashboard/content/check',
            templateUrl: '/components/dashboard/content/check/check.html'
        });

        $stateProvider.state('dashboard.share', {
            url: '/dashboard/content/share',
            templateUrl: '/components/dashboard/content/share/share.html'
        });

        $stateProvider.state('dashboard.history', {
            url: '/dashboard/content/history',
            templateUrl: '/components/dashboard/content/history/history.html'
        });
        /** END SECURE site **/

    };

}());