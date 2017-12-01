(function() {
  "use strict";

  angular
    .module("spa-demo.authn")
    .component("sdSignup", {
      templateUrl: templateUrl,
      controller: SignupController,
    });


  templateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function templateUrl(APP_CONFIG) {
    return APP_CONFIG.authn_signup_html;
  }

  SignupController.$inject = ["$scope","$state","spa-demo.authn.Authn", "spa-demo.layout.DataUtils", "spa-demo.subjects.Image"];
  function SignupController($scope, $state, Authn, DataUtils, Image) {
    var vm=this;
    vm.signupForm = {};
    vm.signup = signup;
    vm.image = null;
    vm.setImageContent = setImageContent;

    vm.$onInit = function() {
      console.log("SignupController",$scope);
    }
    return;
    //////////////
    function signup() {
      console.log("signup...");
      $scope.signup_form.$setPristine();
      Authn.signup(vm.signupForm).then(
        function(response){
          vm.id = response.data.data.id;
          console.log("signup complete", response.data, vm);
          $state.go("home");
          if(vm.image && vm.image.image_content) {
            vm.image.user_id = vm.id;
            vm.image.$save().then(
              function(){
                vm.image = null;
                $state.go("home");
              },
              handleError);
          }
          else {
            vm.image = null;
            $state.go("home");
          }
        },
        function(response){
          vm.signupForm["errors"]=response.data.errors;
          console.log("signup failure", response, vm);
          vm.image = null;
        }
      );
    }

    function setImageContent(dataUri) {
      console.log("setImageContent", dataUri ? dataUri.length : null);
      vm.image = new Image();
      vm.image.image_content = DataUtils.getContentFromDataUri(dataUri);
      vm.image.image_content.content_type = "image/jpeg";
      console.log("setImageContent", vm.image);

    }

    function handleError(response) {
      console.log("error", response);
      if (response.data) {
        vm.image["errors"]=response.data.errors;
      }
      if (!vm.image.errors) {
        vm.image["errors"]={};
        vm.image["errors"]["full_messages"]=[response];
      }
      $scope.imageform.$setPristine();
    }

  }
})();
