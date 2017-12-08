(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("currentImageThings", {
      templateUrl: currentImageThingsTemplateUrl,
      controller: CurrentImageThingsController
    })
    ;

  currentImageThingsTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function currentImageThingsTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.current_image_things_html;
  }

  CurrentImageThingsController.$inject = ["$scope",
                                     "spa-demo.subjects.currentSubjects"];
  function CurrentImageThingsController($scope,currentSubjects) {
    var vm=this;

    vm.$onInit = function() {
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return currentSubjects.getCurrentImageThings(); },
        function(things) { vm.things = things; }
      );
    }
    return;
    //////////////
  }
})();
