(function() {
    'use strict';
    angular
        .module('CopyshareContent.common.api', [
            'CopyshareContent.common.api.publisher', 
            'CopyshareContent.common.api.content'])
        .config([
            'RestangularProvider', 
            '$httpProvider',
            cpConfigCommonApi]);

    function cpConfigCommonApi(RestangularProvider, $httpProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8080/contentapi');
        RestangularProvider.setDefaultHeaders({
            'Content-Type': 'application/json'
        });
        RestangularProvider.setFullResponse(true);
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList") {
                // .. and handle the data and meta data
                extractedData = data._embedded.contentResources;
                extractedData.meta = data.page;
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    };
})();