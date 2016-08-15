angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('main', {
                url: '/main',
                resolve: {
                    mainLoadDataWater: function ($q, dataWater) {
                        return $q(function (resolve, reject) {
                            dataWater.getData().then((res) => {
                                this.data = res;
                                resolve(this.data);
                                reject(this.data);
                            });
                        });
                    },
                    loadDataSelect: function ($q, dataSelect) {
                        return $q(function (resolve, reject) {
                            dataSelect.getData().then((res) => {
                                this.data = res;
                                resolve(this.data);
                                reject(this.data);
                            });
                        });
                    }
                },
                template: '<main-state></main-state>'
            })
            .state('detal', {
                url: '/detal/:index/:obj',
                template: '<detal></detal>'
            }).state('buy', {
                url: '/buy',
                resolve: {
                    buyLoadDataWater: function ($q, dataWater) {
                        return $q(function (resolve, reject) {
                            dataWater.getData().then((res) => {
                                this.data = res;
                                resolve(this.data);
                                reject(this.data);
                            });
                        });
                    }
                },
                template: '<buy-items></buy-items>'
            });


        $urlRouterProvider.otherwise('main');

    }]);



angular
    .module("app")
    .run(['$rootScope',function($rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            //$('.modal, .fade').modal('hide');
            console.log('chenge state');
        });
    }]);

























