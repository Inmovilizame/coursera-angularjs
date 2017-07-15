(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);


    ItemsController.$inject = ['category', 'items'];
    function ItemsController(category, items) {
        var itsctrl = this;
        console.log('Items controller: ', items)
        itsctrl.category = category
        itsctrl.items = items;
    }

})();