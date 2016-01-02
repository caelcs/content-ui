(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.public.intro', [])
        .config(
            [
                '$stateProvider',
                 cpConfigIntroRoute
            ]);

    function cpConfigIntroRoute ($stateProvider) {
        $stateProvider.state('public.intro', {
            url: '/intro',
            templateUrl: '/components/public/intro/intro.html'
        });
    };

}());