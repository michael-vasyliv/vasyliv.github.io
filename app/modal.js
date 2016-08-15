angular
    .module('app')
    .directive('modal', [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/tmpl/modal.html',
            scope: {
                text: '='
            },
        }
    }]);