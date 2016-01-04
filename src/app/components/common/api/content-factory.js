(function() {
    'use strict';
    /**
     * Module configuration for the CopyshareContent Common API.
     */
    angular
        .module('CopyshareContent.common.api.content',[])
        .factory('ContentApi', ['Restangular', ContentApi]);


    function ContentApi (Restangular) {
        return {
            createContent: function(publisherUUID, content) {
                return Restangular.one('publishers', publisherUUID).all('contents').post(content);    
            },

            getUnReadContent: function(publisherUUID) {
                console.log('Getting REST unread content');
                return Restangular.one('publishers', publisherUUID).all('contents').getList({'contentStatus': 'UNREAD', 'page':'0', 'size':'10', 'sort':'content,asc'});
            }
        };
    };

}());
		