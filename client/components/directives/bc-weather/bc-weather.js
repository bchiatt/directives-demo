/* jshintrc camelcase: true*/
(function(){
  'use strict';

  angular.module('bcWeatherModule', [])
  .factory('WeatherApi', ['$http', function($http){
    function conditions(zip){
      return $http.jsonp('http://api.wunderground.com/api/7ad931f0c68045c8/conditions/q/' + zip + '.json?callback=JSON_CALLBACK');
    }

    return {conditions:conditions};
  }])
  .directive('bcWeather', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/bc-weather/bc-weather.html';
    o.scope       = {zip: '@'};
    o.link        = function(scope, element, attrs){
      element.on('$destroy', function(){
        $interval.cancel(scope.id);
      });
    };

    o.controller  = ['$scope', 'WeatherApi', function($scope, WeatherApi){
      function getConditions(){
        WeatherApi.conditions($scope.zip).then(function(response){
          $scope.temp = response.data.current_observation.feelslike_f;
          $scope.icon = response.data.current_observation.icon_url;
        });
      }

      $scope.id = $interval(getConditions, 30000);

      getConditions();
    }];

    return o;
  }]);
})();
