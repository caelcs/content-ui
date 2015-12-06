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

    function cpConfigCommonApi(RestangularProvider, AccessToken) {
        RestangularProvider.setBaseUrl('/contentapi');
        RestangularProvider.setRequestSuffix('.json');
        RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer ' + AccessToken.get().access_token });
    };
}());