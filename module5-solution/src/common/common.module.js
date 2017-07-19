(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://floating-mountain-27382.herokuapp.com')
.config(config);

// User created Admin:Admin

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
