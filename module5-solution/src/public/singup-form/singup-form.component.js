(function () {
"use strict";

angular.module('public')
.component('singupForm', {
  templateUrl: 'src/public/singup-form/singup-form.html',
  bindings: {
    categories: '<'
  },
  controller: SingupFormController
});


SingupFormController.$inject = ['MenuService', 'UserService'];
function SingupFormController(MenuService, UserService) {
  var $ctrl = this;

  $ctrl.user = {}

  $crtl.favitemError = false;

  $ctrl.submit = function () {
    console.log('SingupComponent: ', $ctrl.user);

    MenuService.getMenuItem($ctrl.user.short_name)
      .then(
        function (response) {
          $crtl.favitemError = true;
          UserService.setUser($ctrl.user);
        },
        function (response) {
          $crtl.favitemError = true;
        });
  }
}

})();
