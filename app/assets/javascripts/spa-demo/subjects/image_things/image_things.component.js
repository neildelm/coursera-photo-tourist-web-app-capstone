(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("imageThings", {
      templateUrl: imageThingsTemplateUrl,
      controller: ImageThingsController
    })
    ;

  imageThingsTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function imageThingsTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.image_things_html;
  }

  ImageThingsController.$inject = ["spa-demo.subjects.currentSubjects"];
  function ImageThingsController(CurrentSubjects) {
    var vm = this;
    vm.hasThings = hasThings;

    vm.$onInit = function() {

    }
    return;

    function hasThings() {
      return CurrentSubjects.getCurrentImageThings().length > 0;
    }
  }
})();
