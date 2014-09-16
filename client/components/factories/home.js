(function(){
  'use strict';

  angular.module('directives-demo')
  .factory('Home', ['$http', function($http){

    function all(){
      return $http.get('/home');
    }

    function addMov(title){
      return $http.post('/home/movies', {title:title});
    }

    function delMov(index){
      return $http.delete('/home/movies/' + index);
    }

    return {all:all, addMov:addMov, delMov:delMov};
  }]);
})();

