describe('Publisher Factory function', function() {
  var Restangular, api, httpBackend, authRequestHandler;

  beforeEach(module('restangular'));
  beforeEach(module('CopyshareContent.common.api.publisher'));

  beforeEach(inject(function(_Restangular_) {
  	Restangular = _Restangular_;
  }));

  beforeEach(inject(function(_$httpBackend_) {
    httpBackend = _$httpBackend_;
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  }));

  beforeEach(inject(function(PublisherApi) {
    api = PublisherApi;
  }));

  describe('PublisherApi', function() {
    it('should get publisher by Access Token', function() {
    	spyOn(Restangular, 'one').and.callThrough();

      // This will fail the spec if this http request does not happen.
      httpBackend.whenGET('/publisher/current').respond({id:1, title: 'my title', body: 'my body'});

    	var responseApi = api.getCurrentLogin();
  
      expect(Restangular.one).toHaveBeenCalled();
      expect(responseApi).toBeDefined();

      httpBackend.flush();
    });
  });
});