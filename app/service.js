//сервис данных по воде
angular
    .module('app')
    .service('dataWater', ['$http', '$q', function ($http, $q) {
        this.data;

        this.getData = () => {
            $http.get('data.json').then((res) => {
                this.data = res.data;
            }, (rej) => {
                this.data = rej;
            });
            var d = $q.defer();
            d.resolve(this.data);
            return d.promise;
        }
    }]);

//сервис меню селектов
angular
    .module('app')
    .service('dataSelect', ['$http', '$q', function ($http, $q) {
        this.data;

        this.getData = () => {
            $http.get('data-select.json').then((res) => {
                this.data = res.data;
            });
            var d = $q.defer();
            d.resolve(this.data);
            return d.promise;
        }
    }]);

// сервис фильтров
angular
    .module('app')
    .service('dataFilters', ['$q', function ($q) {
        this.objFilter = {
            ionsFilter: '',
            sizeFilter: '',
            mineralFilter: ''
        };
        // устанавливает данные фильтрации по отдельности
        this.setData = (ions, size, mineral) => {
            if (ions) {
                if (ions === "all") {
                    this.objFilter.ionsFilter = '';
                } else {
                    this.objFilter.ionsFilter = ions;
                }
            } else if (size) {
                if (size === "all") {
                    this.objFilter.sizeFilter = '';
                } else {
                    this.objFilter.sizeFilter = size;
                }
            } else if (mineral) {
                console.log(mineral);
                if (mineral === '>3') {
                    this.objFilter.mineralFilter = (item) => {
                        return item.mineral > 3;
                    };
                } else if (mineral === '<3') {
                    this.objFilter.mineralFilter = (item) => {
                        return item.mineral < 3;
                    };
                } else if (mineral === 'all') {
                    this.objFilter.mineralFilter = (item) => {
                        return item.mineral;
                    };
                }
            }

        };
        this.getData = () => {
            var def = $q.defer();
            def.resolve(this.objFilter);
            return def.promise;
        };
        this.resetData = () => {
            var def = $q.defer();
            this.objFilter = {
                ionsFilter: '',
                sizeFilter: '',
                mineralFilter: ''
            };
            def.resolve(this.objFilter);
            return def.promise;
        }
    }]);



/*--------------фильтры-------------------*/
angular
    .module('app')
    .filter('filterToUpperCase', [function () {
        return function (item) {
            if (typeof item === "string") {
                var first = item.substring(0, 1);
                var last = item.substring(1);
                var firstUpper = first.toUpperCase();
                var full = firstUpper + last;
                return full;
            } else {
                return item;
            }

        }
    }]);


angular
    .module('app')
    .filter('startFrom', [function () {
        return function (item, start) {
            if (angular.isArray(item)) {
                //parse to int
                start = +start;
                return item.slice(start);
            }

        }
    }]);























