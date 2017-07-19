(function () {
"use strict";

angular.module('public')
.controller('SingupController', SingupController);

SingupController.$inject = ['menuCategories'];
function SingupController(menuCategories) {
  var singupCtrl = this;
  singupCtrl.menuCategories = menuCategories;
}

})();
