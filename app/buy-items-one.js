angular
    .module('app')
    .directive('buyItemsOne', [function () {
        return {
            restrict: 'E',
            scope: {
                item: '=',
                del: '&',
                setPrice: '='
            },
            templateUrl: 'app/tmpl/buy-items-one.html',
            bindToController: true,
            controllerAs: 'one',
            controller: function () {
                this.item;
                this.del;
                this.array = [];
                this.selected = this.item.size[0];
                this.priseForOne = () => {
                    var summ = Math.round(((+this.item.rating) + (+this.item.mineral)) * (+this.item.size[0]) * 100) / 100;
                    return summ;
                }
            }
        }
    }]);