(function() {
	'use strict';

	/**
	*  Module
	*  CopyshareContent Sescription
	*/
	angular
		.module('CopyshareContent')
		.directive('cpApplyMenuEffect', ['$document', cpApplyMenuEffectDirective]);

	function cpApplyMenuEffectDirective($document){
		var $win = angular.element($document);
		return {
			link: function($scope, iElm, iAttrs) {
				var $elem = angular.element(iElm);
				iElm.on('click', function(event) {
        			// Prevent default dragging of selected content
        			$document.stop().animate(
	        					{
	            					scrollTop: iElm.offset().top
	        					}
	        					,1500
	        					,'easeInOutExpo'
        					);
        			event.preventDefault();
      			});
			}
		};
	};

})();
