(function(){
  'use strict';

  angular.module('directives-demo')
  .controller('HomeCtrl', ['$scope', 'Home', function($scope, Home){
    $scope.frequencies = ['2000', '1000', '500', '250', '10'];
    $scope.people      = [{name:'Bob', age:25}, {name:'Sally', age:500}, {name:'Baxter', age:3}];
    $scope.symbols     = ['GOOG', 'MSFT', 'AMZN'];
    $scope.zips        = ['37203', '45434', '46911'];
    $scope.movies      = ['The Hobbit', 'Dumb And Dumberer', 'Shrek 2', 'Texas Chainsaw Massacre'];
  }]);
})();

