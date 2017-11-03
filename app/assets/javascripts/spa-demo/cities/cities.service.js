(function() {
    "use strict";
    //  Module
    angular
        .module("spa-demo.cities")
        .factory("spa-demo.cities.City", CityFactory);
    //  factory
    CityFactory.$inject =  ["$resource", "spa-demo.APP_CONFIG"];
    function CityFactory($resource, APP_CONFIG) {
      return $resource(APP_CONFIG.server_url + "/api/cities/:id",
        { id: '@id'},
        {
            update: {method: "PUT",
            transformRequest: buildNestedBody },
            save: {method: "POST",
            transformRequest: buildNestedBody }
        }
        );
      // nests the default payload below a "city" element as required by default by Rails API resource
      function buildNestedBody(data) {
        return angular.toJson({city: data});
      }
    }
})();
