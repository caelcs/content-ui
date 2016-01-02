(function() {
    'use strict';

    angular.module('CopyshareContent.public', [
    	'CopyshareContent.public.about',
    	'CopyshareContent.public.contact', 
    	'CopyshareContent.public.intro', 
    	'CopyshareContent.public.team'
    ])
    .config(
            [
                '$stateProvider',
                '$locationProvider',
                 cpConfigCommonPublicRoutes
            ]);

    function cpConfigCommonPublicRoutes ($stateProvider, $locationProvider) {       
        $stateProvider.state('public', {
            abstract: true,
            templateUrl: '/components/public/public.html',
            data: {
                isSecure: false
            }
        });

        $stateProvider.state('public.index', {
            url: '/',
            templateUrl: '/components/public/intro/intro.html'
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    };
})();