describe('Share controller function', function() {

  var $controller, PublisherApi, scope;

  beforeEach(module('CopyshareContent.dashboard.share.controller'));

  beforeEach(function() {
    module(function($provide) {
      $provide.value('PublisherApi', {
        getCurrentLogin: function() {
          return {
            then: function(callback) { return callback({});}
          };
        }
      });
    })
  });

  beforeEach(inject(function(_$controller_, $rootScope, _PublisherApi_){
      scope = $rootScope.$new();
      PublisherApi = _PublisherApi_;
      $controller = _$controller_;
  }));

  describe('ShareController', function() {
    it('should get publisher to publish content', function() {
      spyOn(PublisherApi, 'getCurrentLogin').and.callThrough();

      $controller('ShareController', {$scope: scope, PublisherApi: PublisherApi});
      
      scope.publisher();

      expect(PublisherApi.getCurrentLogin).toHaveBeenCalled();
    });
  });
});