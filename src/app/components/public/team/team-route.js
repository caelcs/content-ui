(function() {
    'use strict';
    /**
     * Route configuration for the CopyshareContent module.
     */
    angular
        .module('CopyshareContent.public.team', [])
        .config(
            [
                '$stateProvider',
                 cpConfigTeamRoute
            ]);

    function cpConfigTeamRoute ($stateProvider) {
        $stateProvider.state('public.team', {
            url: '/team',
            templateUrl: '/components/public/team/team.html'
        });
    };

}());