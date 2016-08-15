angular
    .module('app')
    .directive('mainState', [function() {
        return {
            restrict: "E",
            templateUrl: "app/tmpl/main-state.html",
            controller: function() {

            },
            controllerAs: 'mainState'
        }
    }]);