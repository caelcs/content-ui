(function() {
    'use strict';
    /**
     * Module configuration for the CopyshareContent Common API.
     */
    angular
        .module('CopyshareContent.common.api.publisher',[])
        .factory('PublisherApi', ['Restangular', PublisherApi]);

    function PublisherApi (Restangular) {
        return {
            getCurrentLogin: function() {
                return Restangular.one('publisher', 'current').get();    
            }
        };
    };

}());
		