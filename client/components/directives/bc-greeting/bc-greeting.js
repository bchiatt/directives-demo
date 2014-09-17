(function(){
  'use strict';

  angular.module('bcGreetingModule', [])
  .directive('bcGreeting', [function(){
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/components/directives/bc-greeting/bc-greeting.html';
    //for o.scope...'false' inherits the scope of the controller it's used in, 'true' creates a private scope and inherits from controller, '{}' isolates scope
    //'@' looks for a property 'name' being passed in and assigns the value if found
    o.scope = {name:'@', age:'@'};

    return o;
  }]);
})();
