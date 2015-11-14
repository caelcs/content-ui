(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.public.about', [])
        .config(
            [
                '$stateProvider',
                 cpConfigAboutRoute
            ]);

    function cpConfigAboutRoute ($stateProvider) {
        $stateProvider.state('public.about', {
            url: '/about',
            templateUrl: '/components/public/about/about.html'
        });
    };

}());