(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['user', 'menuItem'];
function MyinfoController(user, menuItem) {
  var infoCtrl = this;
  infoCtrl.user = user;
  infoCtrl.menuItem = menuItem
}

})();
