(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.dashboard.share.route', [])
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
    };

}());
		