(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    function LunchCheckController($scope) {
        $scope.in_data = "";
        $scope.message = 'Please enter data first';

        $scope.checkMyLunch = function () {
            var lunchList = [];
            $scope.in_data.split(',').forEach(function(element) {
                if (!element instanceof String){
                    return;
                }
                var value = element.trim();
                if (value === '') {
                    return;
                }

                lunchList.push(value);
            });
            if ($scope.in_data === '') {
                $scope.message = 'Please enter data first';
            } else if (lunchList.length <= 3) {
                $scope.message = 'Enjoy!';
            } else {
                $scope.message = 'Too much!'
            }
        };
    };
})();