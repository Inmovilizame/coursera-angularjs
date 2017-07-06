(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    ;

    NarrowItDownController.$inject = [];
    function NarrowItDownController() {

    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var search = this;

        search.getMatchedMenuItems = function (searchTerm) {

        };
    }
})();