// intialize the model
var modelModule = angular.module('modelModule', []);
modelModule.factory('ngmodel', ['$window', function (win) {
        var model = new Model();
        model.addDay();
//         model.addActivity(new Activity("Introduction", 10, 0, ""));
//        model.addActivity(new Activity("Introduction", 10, 0, ""));
//         model.addActivity(new Activity("Idea 1", 30, 0, ""));
        //console.log(model.days[0]._activities);
//         console.log("Day End: " + model.days[0].getEnd());
        return {
            results: model
        }
    }]);