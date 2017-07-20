(function () {
  "use strict";

  angular.module('common')
    .service('UserService', UserService);


  UserService.$inject = [];
  function UserService() {
    var service = this;

    service.user = {};

    service.setUser = function (user) {
      service.user = user;
    }

    service.getUser = function () {
      if (Object.keys(service.user).length === 0) {
        return undefined
      }

      return service.user;
    }

  }

})();
