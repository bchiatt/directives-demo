/* jshintrc camelcase: true*/
(function(){
  'use strict';

  angular.module('bcWeatherModule', [])
  .factory('WeatherApi', ['$http', function($http){
    function conditions(query){

      return $http.jsonp('http://api.wunderground.com/api/7ad931f0c68045c8/conditions/q/' + query + '.json?callback=JSON_CALLBACK');
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

      $scope.$on('position', function(event, pos){
        if($scope.zip){return;}

        var query = pos.coords.latitude + ',' + pos.coords.longitude;
        getConditions(query);
      });

      function getConditions(query){
        WeatherApi.conditions(query).then(function(response){
          $scope.place = response.data.current_observation.observation_location.city;
          $scope.temp  = response.data.current_observation.feelslike_f;
          $scope.icon  = response.data.current_observation.icon_url;
        });
      }

      if($scope.zip){getConditions($scope.zip);}

    }];

    return o;
  }]);
})();
