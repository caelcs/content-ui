(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.dashboard.check', [])
        .config(
            [
                '$stateProvider',
                 cpConfigCheckRoute
            ]);

    function cpConfigCheckRoute ($stateProvider) {
        $stateProvider.state('dashboard.check', {
            url: '/dashboard/content/check',
            templateUrl: '/components/dashboard/content/check/check.html'
        });
    };

}());
		