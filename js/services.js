// intialize the model
var modelModule = angular.module('modelModule', []);
modelModule.factory('ngmodel', ['$window', function (win) {
        var model = new Model();
        return {
            results: model
        }
    }]);