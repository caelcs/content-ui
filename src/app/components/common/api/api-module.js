(function() {
    'use strict';

    angular
        .module('CopyshareContent.common.api', [
            'CopyshareContent.common.api.publisher',
            'CopyshareContent.common.api.content'
        ])
        .config([
            'RestangularProvider',
            '$httpProvider',
            cpConfigCommonApi]);

    function cpConfigCommonApi(RestangularProvider, $httpProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8080/contentapi');
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
        RestangularProvider.setFullResponse(true);
    };
})();
