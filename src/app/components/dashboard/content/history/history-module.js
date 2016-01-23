(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.dashboard.history', [
            'CopyshareContent.dashboard.history.controller'])
        .config(
            [
                '$stateProvider',
                 cpConfigHistoryRoute
            ]);

    function cpConfigHistoryRoute ($stateProvider) {
        $stateProvider.state('dashboard.history', {
            url: '/dashboard/content/history',
            templateUrl: '/components/dashboard/content/history/history.html'
        });
    };

}());
		