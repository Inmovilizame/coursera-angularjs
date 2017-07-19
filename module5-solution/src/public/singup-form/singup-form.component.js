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


SingupFormController.$inject = [];
function SingupFormController() {
  var $ctrl = this;

  $ctrl.user = {}

  $ctrl.submit = function () {
  }
}

})();
