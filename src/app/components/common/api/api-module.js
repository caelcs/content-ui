(function() {
    'use strict';
    angular
        .module('CopyshareContent.common.api', [
            'CopyshareContent.common.api.publisher', 
            'CopyshareContent.common.api.content'])
        .config([
            'RestangularProvider', 
            '$httpProvider',
            'apiUrl',
            cpConfigCommonApi]);

    function cpConfigCommonApi(RestangularProvider, $httpProvider, apiUrl) {
        RestangularProvider.setBaseUrl(apiUrl + '/contentapi');
        RestangularProvider.setDefaultHeaders({
            'Content-Type': 'application/json'
        });
        RestangularProvider.setFullResponse(true);
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList") {
                // .. and handle the data and meta data
                if (data._embedded != undefined) {
                    extractedData = data._embedded.contentResources;
                    extractedData.meta = data.page;    
                } else {
                    extractedData = [];
                }
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    };
})();