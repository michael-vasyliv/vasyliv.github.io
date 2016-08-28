angular
    .module('app')
    .directive('order', [
        '$http',
        function ($http) {
            return {
                restrict: 'E',
                templateUrl: 'app/tmpl/order.html',
                scope: {
                    array: '=',
                    sum: '='
                },
                bindToController: true,
                controllerAs: 'order',
                controller: function () {
                    this.array;
                    this.sum;
                    this.name = '';
                    this.email = '';
                    this.phone = '';
                    this.massage = '';

                    this.postData = () => {
                        console.log('first stage');
                        if (this.name && this.email && this.phone) {
                            console.log('second stage');
                            var data = {};
                            data.array = this.array;
                            data.name = this.name;
                            data.email = this.email;
                            data.phone = this.phone;
                            data.summ = this.sum;
                            $http.post('/fake.php', data).then((res) => {
                                this.massage = res;
                                console.log(res);
                            }, (rej) => {
                                this.massage = rej;
                                console.log(rej);
                            });
                            //очистка
                            this.name = '';
                            this.email = '';
                            this.phone = '';
                            //this.array;
                            //$cookies.putObject('buyArray', []);
                        }
                    };
                    console.log(this.array);

                }
            }
        }]);