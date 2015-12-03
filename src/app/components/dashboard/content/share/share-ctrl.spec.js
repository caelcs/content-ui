describe('Share controller function', function() {

  var $controller;

  beforeEach(module('CopyshareContent.dashboard.share.controller'));

  beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
  }));

  describe('ShareController', function() {
    it('should get publisher to publish content', function() {
      var $scope = {};
      $controller('ShareController', {$scope: $scope});

      expect($controller).toBeDefined();
      expect($scope.publisher()).toBe('');

    });
  });
});