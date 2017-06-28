(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    ;

    ToBuyController.$inject = ['ShoppingListCheckOffService']
    function ToBuyController(ShoppingListCheckOffService) {
        var tobuy = this;

        tobuy.items = function () {
            return ShoppingListCheckOffService.getToBuyItems();
        }

        tobuy.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }

        tobuy.allBought = function() {
            return ShoppingListCheckOffService.allBought();
        }
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = function () {
            return ShoppingListCheckOffService.getBoughtItems();
        }

        bought.emptyCart = function() {
            return ShoppingListCheckOffService.emptyCart();
        }

        bought.isCookieRecipe = function() {
            var items = ShoppingListCheckOffService.getBoughtItems();
            var cookieIngredients = ["flour", "sugar", "chocolate chips", "eggs"]
            var ingredientsCount = 0;
            items.forEach(function(element) {
                if (-1 !== cookieIngredients.indexOf(element.name)) {
                    ingredientsCount++;
                }
            });

            return ingredientsCount >= cookieIngredients.length;
        }
    };

    function ShoppingListCheckOffService() {
        var service = this;

        var tobuy = [
            {name: "cookies", quantity: 10},
            {name: "flour", quantity: 1},
            {name: "sugar", quantity: 2},
            {name: "chocolate chips", quantity: 3},
            {name: "eggs", quantity: 12},
        ];
        var bought = [];

        service.buyItem = function (index) {
            // also item = tobuy.splice(index,1)[0];
            var item = tobuy[index];
            tobuy.splice(index, 1);
            bought.push(item);
        };

        service.allBought = function() {
            return 0 === tobuy.length;
        }

        service.emptyCart = function() {
            return 0 === bought.length;
        }
        
        service.getToBuyItems = function () {
            return tobuy;
        }

        service.getBoughtItems = function () {
            return bought;
        }
    };
})();