(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems)
    .directive('itemLoaderIndicator', ItemLoaderIndicator)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    ;

    function ItemLoaderIndicator() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'itemLoaderIndicator.html',
            scope: {
                showLoader: '<'
            },
            controller: ItemLoaderDirectiveController,
            controllerAs: 'loader',
            bindToController: true,
            link: ItemLoaderDirectiveLink,
        };

        return ddo
    }

    function ItemLoaderDirectiveLink(scope, element, attrs, controller) {
        scope.$watch('loader.showLoader', function (newValue, oldValue) {
            var divloader = element.find("div");
            if (newValue) {
                divloader.css('display', 'block');
            } else {
                divloader.css('display', 'none');
            }
            
        });
    }

    function ItemLoaderDirectiveController() {
        var loader = this;
    }

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
        narrowit.notFoundFlag = false;
        narrowit.queringBackend = false;

        narrowit.filtermenu = function () {
            narrowit.queringBackend = true;
            narrowit.notFoundFlag = false;
            narrowit.found = [];

            if (narrowit.searchterm.trim().length === 0) {
                narrowit.queringBackend = false;
                narrowit.notFoundFlag = true;
                return;
            }

            var promise = MenuSearchService.getMatchedMenuItems(narrowit.searchterm);
            promise.then(function (filteredItems) {
                console.log("We have found ", filteredItems.length, " items");
                console.log(filteredItems);
                narrowit.found = filteredItems;

                narrowit.queringBackend = false;
                if (filteredItems.length === 0) {
                    narrowit.notFoundFlag = true;
                    return;
                }
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