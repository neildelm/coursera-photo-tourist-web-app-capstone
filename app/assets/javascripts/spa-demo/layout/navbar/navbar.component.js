(function() {
  "use strict";

  angular
    .module("spa-demo.layout")
    .component("sdNavbar", {
      templateUrl: templateUrl,
      controller: NavbarController
    });


  templateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function templateUrl(APP_CONFIG) {
    return APP_CONFIG.navbar_html;
  }

  NavbarController.$inject = ["$rootScope","$scope","spa-demo.authn.Authn","spa-demo.authn.whoAmI"];
  function NavbarController($rootScope, $scope, Authn, whoAmI) {
    var vm=this;
    vm.getLoginLabel = getLoginLabel;
    vm.includeImage = includeImage;
    vm.userImage = null;

    vm.$onInit = function() {
      console.log("NavbarController",$scope);
    }

    load();
    return;
    //////////////

    function load() {
      $rootScope.$watch(function(){ return Authn.getCurrentUserId(); }, getUserImage);
    }

    function getLoginLabel() {
      return Authn.isAuthenticated() ? Authn.getCurrentUserName() : "Login";
    }

    function includeImage() {
      return Authn.isAuthenticated() && vm.userImage;
    }

    function getUserImage() {
      return whoAmI.get().$promise.then(
        function(value) {
          if (value["image_content_url"])
            vm.userImage = value["image_content_url"];
          else
            vm.userImage=null;
          }, function(value) { vm.userImage = null; }
      );
    }

  }
})();
