angular
    .module('app')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('main', {
                    url: '/main',
                    resolve: {
                        mainLoadDataWater: function($q, dataWater) {
                            var test = $q.defer();
                            dataWater.getData().then((res) => {
                                this.data = res;
                                test.resolve(this.data);
                                test.reject(this.data);
                            });
                            return test.promise;
                        },
                        loadDataSelect: function($q, dataSelect) {
                            return $q(function(resolve, reject) {
                                dataSelect.getData().then((res) => {
                                    this.data = res;
                                    resolve(this.data);
                                    reject(this.data);
                                });
                            });
                        }
                    },
                    template: '<main-state></main-state>',
                   })
                .state('detal', {
                    url: '/detal/:index/:obj',
                    template: '<detal></detal>'
                })
                .state('buy', {
                    url: '/buy',
                    resolve: {
                        buyLoadDataWater: function($q, dataWater) {
                            return $q(function(resolve, reject) {
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
            $urlRouterProvider.when('/main', ['$state', function($state) {
                console.log('when work');
            }]);
             $locationProvider.html5Mode(true);
        }
    ]);


angular
    .module("app")
    .run(['$rootScope', function($rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            console.log('chenge state');
        });
    }]);
