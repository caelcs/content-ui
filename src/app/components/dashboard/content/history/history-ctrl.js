(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular.module('CopyshareContent.dashboard.history.controller', [])
    	.controller('HistoryController', ['$scope', '$location', 'PublisherApi', 'ContentApi', 'Notification', HistoryController]);

    function HistoryController($scope, $location, PublisherApi, ContentApi, Notification) {
        $scope.current;
        $scope.contents;

        $scope.checkReadContent = function() {
            console.log('Getting Current Publisher login');
            PublisherApi.getCurrentLogin().then(function(resultPublisher) {
                $scope.current = resultPublisher.data;
                console.log('publisher: ' + $scope.current);
                ContentApi.getReadContent($scope.current.publisherUUID).then(function(resultContent) {
                	console.log('Getting read content');
                    $scope.contents = resultContent.data;
                });
            });
        };
    };
}());