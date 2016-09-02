angular
    .module('app')
    .directive('buyItemsOne', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                item: '=',
                setPrice: '&',
                array: '=',
                index: '=',
                del: '&'
            },
            templateUrl: 'app/tmpl/buy-items-one.html',
            controllerAs: 'one',
            bindToController: true,
            controller: function () {

                this.priseForOne = () => {
                    var summ = Math.round(((+this.item.rating) + (+this.item.mineral)) * (+this.item.size[0]) * 100) / 100;
                    return summ;
                }
            },
            link: function(scope, element, attrs, controller, transcludeFn) {
            }
        }
    }]);