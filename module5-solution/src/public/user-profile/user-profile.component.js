(function () {
"use strict";

angular.module('public')
.component('userProfile', {
  templateUrl: 'src/public/user-profile/user-profile.html',
  bindings: {
    user: '<'
  },
  controller: UserProfileController
});


UserProfileController.$inject = [];
function UserProfileController() {
  var $ctrl = this;
}

})();
