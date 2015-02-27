var service = angular.module('arrayService', []);

service.factory('notify', ['$window', "$http", function (win, $http) {
        var result = [];
        $http.get('phones/phones.json').success(function (data) {

            angular.forEach(data, function (i, val) {
                result.push(i);
            });

            //test.push(data)
            //console.log(test);
            /// return  data;
        });

        return {
            results: result
        }

    }]);