angular
    .module('app')
    .directive('mainItems', [
        '$q',
        '$filter',
        '$stateParams',
        '$state',
        '$cookies',
        'dataFilters',
        'dataWater',
        function ($q, $filter, $stateParams, $state, $cookies, dataFilters, dataWater) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/tmpl/main-items.html',
                controller: function () {
                    //init
                    dataFilters.resetData();

                    // основная фильтрация (вывод пагинированных данных и фильтрация пагинации в view)
                    this.filtering = () => {
                        //dataFilters.resetData();
                        this.data = $filter('filter')(this.dataClone, {
                            water: this.ionsF,
                            size: this.sizeF,
                            mineral: this.minF
                        });
                        this.data = $filter('filter')(this.data, this.minF);
                    };


                    dataWater.getData().then((res) => {
                        this.data = res;
                        this.dataClone = res;
                        this.setPaginationPage();
                    });

                    dataFilters.getData().then((res) => {
                        this.dataFilter = res;
                    });


                    this.sear = (ions, size, min) => {
                        this.ionsF = ions;
                        this.sizeF = size;
                        this.minF = min;
                        this.filtering();
                        this.setPaginationPage();
                    };

                    this.goDetal = (index, obj) => {
                        //кидаем в урлу
                        var objJson = JSON.stringify(obj);
                        $state.go('detal', {index: index, obj: objJson});
                    };

                    /*-------------------пагинация страницы--------------------*/
                    this.setPaginationPage = () => {

                        //кол-во кнопок пагинации
                        this.limitPagination = 5;
                        this.currentPage = 0;
                        this.currentPagination = 0;
                        //кол-во пагинируемых итемов
                        this.pageSize = 3;
                        this.paginationPages = [];
                        this.countPages = (this.data.length) / (this.pageSize);

                        // создание массива со страницами пагинации
                        for (var j = 0; j < this.countPages; j++) {
                            this.paginationPages.push(j);
                        }

                        this.setPageArrow = (arr) => {
                            //проверка багов
                            if (this.currentPage == 0 && arr == 'pre') {
                                return false;
                            } else if (this.currentPage >= this.data.length / this.pageSize - 1 && arr == 'next') {
                                return false;
                                //генерация состояния
                            } else if (arr == 'pre') {
                                if (this.currentPagination == 0) {
                                    this.currentPage--;
                                    this.currentPagination;
                                } else if (this.currentPagination > 0) {
                                    this.currentPage--;
                                    this.currentPagination--;
                                }

                            } else if (arr == "next") {
                                var lenN = this.paginationPages.length - this.limitPagination;
                                if (this.currentPagination >= lenN) {
                                    this.currentPage++;
                                    this.currentPagination;
                                } else if (this.currentPagination >= 0) {
                                    this.currentPage++;
                                    this.currentPagination++;
                                }
                            }

                        };
                        this.setPagination = (curr) => {

                            var stateBegine = Math.floor(this.limitPagination / 2);
                            var fromEnd = this.paginationPages.length - stateBegine;
                            var stateEnd = this.paginationPages.length - this.limitPagination;

                            if (stateEnd <= 0) {
                                stateEnd = 0;
                            }

                            this.currentPage = curr;

                            if (curr >= 0 && curr < stateBegine) {
                                this.currentPagination = 0;
                            } else if (curr >= fromEnd) {
                                this.currentPagination = stateEnd;
                            } else if (curr >= stateBegine) {
                                this.currentPagination = curr - stateBegine;
                            }

                        };



                    };
                    /*---------------------------------------------------------------------------------------------*/
                },
                controllerAs: 'mainItems'
            };
        }]);