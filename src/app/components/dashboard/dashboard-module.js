(function() {
	'use strict';

	angular
		.module('CopyshareContent.dashboard', 
			[
				'CopyshareContent.dashboard.check',
				'CopyshareContent.dashboard.history',
				'CopyshareContent.dashboard.share'
		])
		.config(
            [
                '$stateProvider',
                '$locationProvider',
                 cpConfigCommonSecureRoutes
        ]);

    function cpConfigCommonSecureRoutes ($stateProvider, $locationProvider) {
        $stateProvider.state('dashboard', {
            abstract: true,
            templateUrl: '/components/dashboard/dashboard.html',
            data: {
                isSecure: true
            }
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    };
})();
