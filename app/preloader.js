angular
    .module('app')
    .directive('preloader', [function() {
        return {
            restrict: "E",
            templateUrl: 'app/tmpl/preloader.html'
        }
    }]);