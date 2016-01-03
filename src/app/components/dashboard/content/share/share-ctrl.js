(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.dashboard.share.controller', [])
        .controller('ShareController', ['$scope', '$location', 'PublisherApi', 'ContentApi', ShareController]);

    function ShareController ($scope, $location, PublisherApi, ContentApi) {
        $scope.current;
        
        $scope.content = {content :""};

        $scope.publishUrl = function() {
            console.log('Getting Current Publisher login');
            PublisherApi.getCurrentLogin().then(function(result) {
                $scope.current = result.data;

                console.log('Creating Content')
                ContentApi.createContent($scope.current.publisherUUID, $scope.content).then(function(result) {
                    if (result.status === 201) {
                        console.log('Redirecting to another');
                        $location.path('/dashboard/content/another');
                    };
                });
            });
        };

        $scope.redirectToShare = function() {
            console.log('Redirect to Share page');
            $location.path('/dashboard/content/share');
        };
    };

}());
		