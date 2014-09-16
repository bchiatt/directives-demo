(function(){
  'use strict';

  angular.module('directives-demo')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.people  = [{name:'Bob', age:25}, {name:'Sally', age:500}, {name:'Baxter', age:3}];
    $scope.symbols = ['GOOG', 'MSFT', 'AMZN'];
    $scope.zips = ['37203', '45434', '46911'];
  }]);
})();

