(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

            // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menuapp/templates/home.template.html'
            })

            // Categories
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menuapp/templates/categories-state.template.html',
                controller: 'CategoriesController as catCtrl',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            // Items
            .state('items', {
                url: '/items/{category}',
                templateUrl: 'src/menuapp/templates/items-state.template.html',
                controller: 'ItemsController as itsCtrl',
                resolve: {
                    category: ['$stateParams', function ($stateParams) {
                        return $stateParams.category;
                    }],
                    items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.category);
                    }]
                }
            })
        ;
    }

})();