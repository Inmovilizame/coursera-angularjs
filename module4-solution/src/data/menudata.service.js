(function () {
    'use strict';

    angular.module('MenuApp')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var menudata = this;

        menudata.getAllCategories = function () {
            console.log("Looking for all categories");
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json"),
            }).then(function (result) {
                return result.data;
            });
        };

        menudata.getItemsForCategory = function (categoryShortName) {
            console.log("Looking for items in: ", categoryShortName);
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName),
            }).then(function (result) {
                console.log("Got result: ", result);
                return result.data.menu_items;
            });
        };
    }
})();