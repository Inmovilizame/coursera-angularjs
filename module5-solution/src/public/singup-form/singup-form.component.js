(function () {
"use strict";

angular.module('public')
.component('singupForm', {
  templateUrl: 'src/public/singup-form/singup-form.html',
  bindings: {},
  controller: SingupFormController
});


SingupFormController.$inject = ['MenuService', 'UserService'];
function SingupFormController(MenuService, UserService) {
  var $ctrl = this;

  $ctrl.user = {}

  $ctrl.favitemError = false;

  $ctrl.singupOK = false;

  $ctrl.submit = function () {
    MenuService.getMenuItem($ctrl.user.short_name)
      .then(
        function (response) {
          console.log("SingupForm: Item exists, saving User!");
          $ctrl.favitemError = false;
          $ctrl.singupOK = true;
          UserService.setUser($ctrl.user);
        },
        function (response) {
          console.log("SingupForm: Item NOT exists!");
          $ctrl.favitemError = true;
        });
  }
}

})();
