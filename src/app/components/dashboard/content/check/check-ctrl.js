(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular.module('CopyshareContent.dashboard.check.controller', [])
    	.controller('CheckController', ['$scope', '$location', 'PublisherApi', 'ContentApi', CheckController]);

    function CheckController($scope, $location, PublisherApi, ContentApi) {
        $scope.current;
        $scope.contents;
        $scope.checkUnreadContent = function() {
            console.log('Getting Current Publisher login');
            PublisherApi.getCurrentLogin().then(function(resultPublisher) {
                $scope.current = resultPublisher.data;
                console.log('publisher: ' + $scope.current);
                ContentApi.getUnReadContent($scope.current.publisherUUID).then(function(resultContent) {
                	console.log('Getting unread content');
                    $scope.contents = resultContent.data;
                });
            });
        };
    };
}());