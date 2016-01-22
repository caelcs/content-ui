(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular.module('CopyshareContent.dashboard.check.controller', [])
    	.controller('CheckController', ['$scope', '$location', 'PublisherApi', 'ContentApi', 'Notification', CheckController]);

    function CheckController($scope, $location, PublisherApi, ContentApi, Notification) {
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

        $scope.showSuccessMessage = function() {
            Notification.success({message: 'Copied!', delay: 1000});
        };

        $scope.markAsRead = function(content) {
            console.log('Mark content as read');
            content.contentStatus = 'READ';
            PublisherApi.getCurrentLogin().then(function(resultPublisher) {
                $scope.current = resultPublisher.data;
                console.log('publisher: ' + $scope.current);
                ContentApi.getContentByUUID($scope.current.publisherUUID, content.contentUUID).then(function(resultGetContentByUUID) {
                    var contentToBeUpdate = resultGetContentByUUID.data;
                    contentToBeUpdate.contentStatus = 'READ';
                    console.log(contentToBeUpdate);
                    ContentApi.updateContent($scope.current.publisherUUID, content.contentUUID, contentToBeUpdate).then(function(resultCreateContent) {
                        console.log('update executed');
                        if (resultCreateContent.status === 200) {
                            console.log('Refresh');
                            ContentApi.getUnReadContent($scope.current.publisherUUID).then(function(resultGetContent) {
                                console.log('Getting unread content');
                                $scope.contents = resultGetContent.data;
                            });
                        };
                    });    
                });
            });
        };
    };
}());