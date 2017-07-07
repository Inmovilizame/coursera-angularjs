(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItems)
    ;

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                items: '<foundItems',
                remove: '&onRemove'
            }
        }; 

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var narrowit = this;
        
        narrowit.searchterm = '';

        narrowit.found = [];

        narrowit.filtermenu = function () {
            var promise = MenuSearchService.getMatchedMenuItems(narrowit.searchterm);
            promise.then(function (filteredItems) {
                console.log("We have found ", filteredItems.length, " items");
                narrowit.found = filteredItems;
            });
        }

        narrowit.removeElement = function(index) {
            narrowit.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var search = this;

        search.getMatchedMenuItems = function (searchTerm) {
            console.log("We are looking for: ", searchTerm);
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            }).then(function (result) {
                var menuItems = result.data.menu_items;
                var foundItems = menuItems.filter(function (value){
                    return -1 !== value.description.indexOf(searchTerm);
                });

                return foundItems;
            });
        }
    }
})();