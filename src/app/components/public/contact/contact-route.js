(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.public.contact', [])
        .config(
            [
                '$stateProvider',
                 cpConfigContactRoute
            ]);

    function cpConfigContactRoute ($stateProvider) {
        $stateProvider.state('public.contact', {
            url: '/contact',
            templateUrl: '/components/public/contact/contact.html'
        });
    };

}());