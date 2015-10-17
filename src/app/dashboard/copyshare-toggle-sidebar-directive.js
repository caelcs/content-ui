(function() {
	'use strict';

	angular.module('CopyshareContent')
		.directive('copyshareToggleSidebar', ['$cookies', function($cookies){
			// Runs during compile
			return {
				link: function($scope) {
					/**
			         * Sidebar Toggle & Cookie Control
			         */
			        var mobileView = 992;

			        $scope.getWidth = function() {
			            return window.innerWidth;
			        };

			        $scope.$watch($scope.getWidth, function(newValue, oldValue) {
			            if (newValue >= mobileView) {
			                if (angular.isDefined($cookies.get('toggle'))) {
			                    $scope.toggle = ! $cookies.get('toggle') ? false : true;
			                } else {
			                    $scope.toggle = true;
			                }
			            } else {
			                $scope.toggle = false;
			            }

			        });

			        $scope.toggleSidebar = function() {
			            $scope.toggle = !$scope.toggle;
			            $cookies.put('toggle', $scope.toggle);
			        };

			        window.onresize = function() {
			            $scope.$apply();
			        };
			    }
			};
		}]);
})();