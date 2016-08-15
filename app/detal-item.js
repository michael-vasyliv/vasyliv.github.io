angular
    .module('app')
    .directive('detal', [
        '$q',
        '$stateParams',
        '$cookies',
        '$state',
        '$timeout',
        function ($q, $stateParams, $cookies, $state, $timeout) {
            return {
                restrict: "E",
                //replace: true,
                scope: {
                    count: '='
                },
                templateUrl: "app/tmpl/detal-item.html",
                controller: function () {
                    // методы jQuery
                    this.showModal = () => {
                        $('.modal').modal('show');
                        this.messageModal = 'Этот товар уже добавлен';
                    };

                    //передаваемый обьект
                    this.obj = JSON.parse($stateParams.obj);

                    //переход
                    this.goMain = () => {
                        $state.go('main');
                    };

                    //покупка итемов
                    this.buyItem = () => {
                        var cookiesArray = [];
                        var checkCopy = false;
                        //товары добавляются на неделю
                        var time = new Date();
                        time.setDate(time.getDate() + 7);
                        //если нету итемов в куки
                        if (!$cookies.getObject('buyArray')) {
                            cookiesArray.push(this.obj.index);
                            $cookies.putObject('buyArray', cookiesArray, {expires: time});

                            $state.go('buy');
                            //если есть итемы в куки
                        } else if ($cookies.getObject('buyArray')) {
                            //если есть итемы в куки
                            var cookies = $cookies.getObject('buyArray');
                            // проверка на наличие товара в масиве товаров
                            for (var i = 0; i < cookies.length; i++) {
                                if (cookies[i] === this.obj.index) {
                                    checkCopy = true;
                                    this.showModal();
                                    break;
                                }
                            }
                            if (!checkCopy) {
                                cookies.push(this.obj.index);
                                $cookies.putObject('buyArray', cookies, {expires: time});

                                $state.go('buy');
                            }
                        }


                    };


                    // еще один вариант получения данных
                    //dataWater.getData().then((res) => {
                    //    this.dataWater = res;
                    //    this.getData();
                    //});

                    //this.getData = () => {
                    //    var def = $q.defer();
                    //    for (var i = 0; i < this.dataWater.length; i++) {
                    //        if (this.dataWater[i].index == $stateParams.index) {
                    //            console.log('work it');
                    //            var position = this.dataWater.indexOf(this.dataWater[i]);
                    //            this.objFor = this.dataWater[position];
                    //            def.resolve(this.objFor);
                    //            return def.promise;
                    //        }
                    //    }
                    //};
                },
                controllerAs: 'detal'
            }
        }]);