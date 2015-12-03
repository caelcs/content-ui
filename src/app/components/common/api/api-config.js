(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.common.api', [])
        .config(
        [
            'RestangularProvider',
            cpConfigCommonApi
        ]);

    function cpConfigCommonApi(RestangularProvider) {
        RestangularProvider.setBaseUrl('/content-api');
        RestangularProvider.setRequestSuffix('.json');
    };
}());