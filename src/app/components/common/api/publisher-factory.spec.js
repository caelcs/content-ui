describe('Publisher Factory function', function() {
  var Restangular, api;

  beforeEach(module('restangular'));
  beforeEach(module('CopyshareContent.common.api.publisher'));

  beforeEach(inject(function(_Restangular_) {
  	Restangular = _Restangular_;
  }));

  beforeEach(inject(function(PublisherApi) {
    api = PublisherApi;
  }));

  describe('PublisherApi', function() {
    it('should get publisher by Access Token', function() {
    	spyOn(Restangular, 'one').and.callThrough();

    	api.getCurrentLogin();
  
      expect(Restangular.one).toHaveBeenCalled();
    });
  });
});