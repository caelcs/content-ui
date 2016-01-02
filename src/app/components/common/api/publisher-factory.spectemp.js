describe('Publisher Factory function', function() {
  var Restangular, api;

  beforeEach(module('CopyshareContent.common.api.publisher'));

  beforeEach(function() {
    module(function($provide) {
      $provide.value('Restangular', function() {
        one: function(publisher, current){
            return '';
        }
      });

      function RestangularGet() {
        jasmine.createSpy();
      };
    })
  });

  beforeEach(inject(function(_Restangular_, PublisherApi) {
  	Restangular = _Restangular_;
    api = PublisherApi;
  }));

  describe('PublisherApi', function() {
    it('should get publisher by Access Token', function() {

      console.log(Restangular.one('publisher', 'current'));

    	spyOn(Restangular.one('publisher', 'current'), 'get').and.callThrough();
      
      api.getCurrentLogin();
  
      expect(Restangular.one.get).toHaveBeenCalled();
    });
  });
});