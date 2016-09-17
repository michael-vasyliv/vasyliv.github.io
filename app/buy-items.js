angular
    .module('app')
    .directive('buyItems', [
        '$cookies',
        'dataWater',
        '$state',
        '$q',
        function($cookies, dataWater, $state, $q) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/tmpl/buy-items.html',
                controllerAs: 'buy',
                controller: function() {
                    function getCookiesObject() {
                        var d = $q.defer();
                        this.dataArrayIndex = $cookies.getObject('buyArray');
                        d.resolve(this.dataArrayIndex);
                        return d.promise;

                    }
                    this.data = [];
                    this.price = 0;

                    /*------------- методы jQuery-----------------*/
                    this.showModal = () => {
                        angular.element('.modal').modal('show');
                    };
                    /*--------------------------------------------*/

                    //получаем данные и из них по куки получаем выбраные итемы
                    dataWater.getData().then((res) => {
                        this.dataWater = res;
                        getCookiesObject().then((resp) => {
                            this.dataArrayIndex = resp;
                            getDataFromIndex();
                            getPriceArray();
                            this.getPriceAll();
                        })

                    });

                    //закидываем данные по индексу в масив
                    getDataFromIndex = () => {
                        for (var i = 0; i < this.dataArrayIndex.length; i++) {
                            var index = this.dataArrayIndex[i];
                            this.data.push(this.dataWater[index]);
                        }
                    };
                    getPriceArray = () => {
                        this.priceArray = [];
                        for (var i = 0; i < this.data.length; i++) {
                            var obj = {};
                            obj['index'] = this.data[i].index;
                            obj['rating'] = this.data[i].rating;
                            obj['mineral'] = this.data[i].mineral;
                            obj['size'] = this.data[i].size[0];
                            this.priceArray.push(obj);
                        }
                    };
                    this.getPriceAll = () => {
                        this.price = 0;
                        for (var i = 0; i < this.priceArray.length; i++) {
                            this.price += ((+this.priceArray[i].rating) + (+this.priceArray[i].mineral)) * (+this.priceArray[i].size);
                        }
                    };
                    //получаем индексы из куки
                    this.getData = () => {
                        this.dataArrayIndex = $cookies.getObject('buyArray')
                    };

                    //удаление елементов
                    this.deleteItem = (obj) => {
                        for (var i = 0; i < this.dataArrayIndex.length; i++) {
                            if (this.dataArrayIndex[i] === obj.index) {
                                //удаляем с куки
                                this.dataArrayIndex.splice(i, 1);
                                $cookies.putObject('buyArray', this.dataArrayIndex);
                                //удаляем с директивы
                                this.data.splice(i, 1);
                            }

                        }
                        getPriceArray();
                        this.getPriceAll();
                    };

                    //переход на мейн страницу
                    this.goMain = () => {
                        $state.go('main');
                    };
                }
            }
        }
    ]);
