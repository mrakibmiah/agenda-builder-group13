var greetApp = angular.module('greetApp', ["arrayService"]);

greetApp.controller("kopasamsu", ["$scope", "notify", "$http", function ($scope, notify, $http) {
        $scope.a = 5;
        $scope.b = 6;
        $scope.master = {};
        // $scope.datas = [];
        // $scope.datas = notify;
        // console.log($scope.datas);
        $scope.callNotify = function (user) {
            //$scope.data = notify.results;
            $scope.master = angular.copy(user);
            //   console.log($scope.datas.length);
        };

        $scope.play = function play() {
            console.log($scope.a * $scope.b);
            return ($scope.a * $scope.b);
            //  alert('I am from first2');
        }

        $scope.double = function (val) {
            return val * 2;
        }

        $scope.spicy = function (spaice) {
            $scope.sp = spaice;
        }

    }]);