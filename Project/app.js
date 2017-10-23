var routerApp = angular.module('routerApp', ['ui.router', 'ngMaterial']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        // nested list with custom controller
        .state('home.popup', {
            url: '/popup',
            //  templateUrl: 'partial-home-list.html',
            controller: function ($scope, $mdDialog,$state) {
                console.log($mdDialog);
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];




                $mdDialog.show({
                    // controller: this,
                    templateUrl: 'customeStatefulpopup.html',
                    parent: angular.element(document.body),
                    // targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                        $state.go('home')
                    });

            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }

        });

});

routerApp.controller('scotchController', function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});