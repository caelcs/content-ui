(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.dashboard.share.controller',[])
        .controller('ShareController', ShareController);

    function ShareController ($scope) {
        $scope.publisher = function() {
            return '';
        };
    };

}());
		