/* jshintrc camelcase: true*/
(function(){
  'use strict';

  angular.module('bcMovieModule', [])
  .factory('MovieApi', ['$http', function($http){
    function movieInfo(title){
      return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=' + title + '&page_limit=1&page=1&apikey=bdewq6fsawpk7em7n24tajut&callback=JSON_CALLBACK');
    }

    return {movieInfo:movieInfo};
  }])
  .directive('bcMovie', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/bc-movie/bc-movie.html';
    o.scope       = {title: '@', remove: '&'};
    o.link        = function(scope, element, attrs){
      element.on('$destroy', function(){
        $interval.cancel(scope.id);
      });
    };

    o.controller  = ['$scope', 'MovieApi', function($scope, MovieApi){
      function getMovieInfo(){
        MovieApi.movieInfo($scope.title).then(function(response){
          $scope.title       = response.data.movies[0].title;
          $scope.releaseDate = response.data.movies[0].release_dates.theater;
          $scope.rating      = response.data.movies[0].mpaa_rating;
          $scope.photo       = response.data.movies[0].posters.detailed.replace(/_tmb/, '_pos');
          $scope.cast        = response.data.movies[0].abridged_cast;
        });
      }

      $scope.id = $interval(getMovieInfo, 30000);

      getMovieInfo();
    }];

    return o;
  }]);
})();
