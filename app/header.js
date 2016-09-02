angular
    .module('app')
    .directive('myHeader', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/tmpl/header.html',
                controller: function () {

                },
                controllerAs: 'header'
            }
        }]);
