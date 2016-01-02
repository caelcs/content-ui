(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.dashboard.share.controller', [])
        .controller('ShareController', ['$scope', 'PublisherApi', ShareController]);

    function ShareController ($scope, PublisherApi) {
        $scope.publisher = function() {
            console.log('Share Controller step 1');
            return PublisherApi.getCurrentLogin();
        };
    };

}());
		