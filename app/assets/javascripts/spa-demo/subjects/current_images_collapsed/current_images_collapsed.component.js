(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("currentImagesCollapsed", {
      templateUrl: currentImagesCollapsedTemplateUrl,
      controller: CurrentImagesCollapsedController
    })
    ;

  currentImagesCollapsedTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function currentImagesCollapsedTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.current_images_collapsed_html;
  }

  CurrentImagesCollapsedController.$inject = ["$scope",
                                     "spa-demo.subjects.currentSubjects"];
  function CurrentImagesCollapsedController($scope, currentSubjects) {
    var vm=this;
    vm.imageClicked = imageClicked;
    vm.isCurrentImage = currentSubjects.isCurrentImageIndex;

    vm.$onInit = function() {
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return currentSubjects.getImages(); },
        function(images) {
          vm.images = [];
          var ids = {};
          for (var i = 0; i < images.length; i++) {
            var image = images[i];
            if (!ids[image.image_id]) {
              vm.images.push(image);
              ids[image.image_id] = true;
            }
          }
        }
      );
    }
    return;
    //////////////
    function imageClicked(index) {
      currentSubjects.setCurrentImage(index);
    }
  }

})();
