// intilaie the controller module
var maincontrollerModule = angular.module('maincontrollerModule', ["modelModule"]);
maincontrollerModule.controller('maincontroller', ['$scope', 'ngmodel', function ($scope, ngmodel) {
        $scope.tomas = 'age';
        $scope.model = ngmodel.results;
        $scope.model.addDay();
        $scope.model.addActivity(new Activity("Introduction", 10, 0, ""), 0);
        angular.forEach(ActivityType, function (sample, index) {
            console.log("Day '" + ActivityType[index] + "' Length: " + $scope.model.days[0].getLengthByType(index) + " min");
        });
        // createTestData(ngmodel.results);
    }]);