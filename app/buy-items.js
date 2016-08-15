angular
    .module('app')
    .directive('buyItems', [
        '$cookies',
        'dataWater',
        '$state',
        function ($cookies, dataWater, $state) {
            return {
                restrict: 'E',
                //replace: true,
                templateUrl: 'app/tmpl/buy-items.html',
                controller: function () {
                    this.dataArrayIndex = $cookies.getObject('buyArray');
                    this.data = [];
                    this.price = 0;

                    /*------------- методы jQuery-----------------*/
                    this.showModal = () => {
                        $('.modal').modal('show');
                        this.messageModal = 'Этот товар уже добавлен';
                    };
                    /*--------------------------------------------*/

                    //получаем данные и из них по куки получаем выбраные итемы
                    dataWater.getData().then((res) => {
                        this.dataWater = res;
                        getDataFromIndex();
                        this.tekePrice();
                    });

                    //закидываем данные по индексу в масив
                    getDataFromIndex = () => {
                        for (var i = 0; i < this.dataArrayIndex.length; i++) {
                            var index = this.dataArrayIndex[i];
                            this.data.push(this.dataWater[index]);
                        }
                    };

                    //получаем индексы из куки
                    this.getData = () => {
                        this.dataArrayIndex = $cookies.getObject('buyArray')
                    };

                    //получаем цену всех товаров из массива
                    this.tekePrice = () => {
                        if (!this.data.length) {
                            this.price = 0;
                        }
                        var sum = 0;
                        for (var j = 0; j < this.data.length; j++) {
                            sum = sum + (+this.data[j].rating * +this.data[j].mineral);
                            this.price = sum;
                        }
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

                                console.log('this.data', this.data);
                                console.log("$cookies.getObject('buyArray')", $cookies.getObject('buyArray'));
                            }

                        }
                        this.tekePrice();
                    };

                    //переход на мейн страницу
                    this.goMain = () => {
                        $state.go('main');
                    };
                },
                controllerAs: 'buy'
            }
        }]);