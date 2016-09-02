angular
    .module('app')
    .directive('mainHead', ['dataSelect', 'dataFilters', function (dataSelect, dataFilters) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/tmpl/main-head.html',
            controller: function () {

                this.ionsName = 'Выберите ионы';
                this.sizeName = 'Интесующая емкость';
                this.mineralName = 'Пределы минерализации';

                //this.dataWater;
                //this.dataSelect;

                dataSelect.getData().then((res) => {
                    this.dataSelect = res;
                });

                this.setFilter = (when, key, val) => {
                    if (when === 'ionsName') {
                        this.ionsName = key;
                        dataFilters.setData(val, null, null);

                    } else if (when === 'sizeName') {
                        this.sizeName = key;
                        dataFilters.setData(null, val, null);

                    } else if (when === 'mineralName') {
                        this.mineralName = key;
                        dataFilters.setData(null, null, val);
                    }
                }
            },
            controllerAs: 'mainHead'
        }
    }]);
