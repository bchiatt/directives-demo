(function(){
  'use strict';

  angular.module('bcClockModule', [])
  .directive('bcClock', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/bc-clock/bc-clock.html';
    o.scope       = {frequency:'@'};
    o.link        = function(scope, element, attrs){
                      function updateTime(){
                        scope.date = new Date();
                      }

                      var id = $interval(updateTime, scope.frequency * 1);

                      element.on('$destroy', function(){
                        $interval.cancel(id);
                      });

                    };

    return o;
  }]);
})();
