(function() {
    'use strict';
    /**
     * Module configuration for the CopyshareContent.dashboard.share.
     */
    angular
        .module('CopyshareContent.dashboard.share', [
            'CopyshareContent.dashboard.share.controller'])
        .config(
            [
                '$stateProvider',
                 cpConfigShareRoute
        ]);

    function cpConfigShareRoute ($stateProvider) {
        $stateProvider.state('dashboard.share', {
            url: '/dashboard/content/share',
            templateUrl: '/components/dashboard/content/share/share.html'
        });

        $stateProvider.state('dashboard.another', {
            url: '/dashboard/content/another',
            templateUrl: '/components/dashboard/content/share/share-another.html'
        });
    };
}());