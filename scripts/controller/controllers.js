// intilaie the controller module
var maincontrollerModule = angular.module('maincontrollerModule', ["modelModule"]);
maincontrollerModule.controller('MainCtrl', ['$scope', 'ngmodel', function ($scope, ngmodel) {
        $scope.model = ngmodel.results; // get the model object    
        $scope.numberOfcolumns = $scope.model.days.length;
        $scope.type = [];

        $scope.addDay = function () {
            $scope.model.addDay();
            $scope.numberOfcolumns = $scope.model.days.length;
            console.log($scope.numberOfcolumns);
        }

        $scope.removeDay = function (index) {
            if (confirm('Are you sure you want to delete this? Warning!! All actvities belong to this day will be deleted too.')) {
                $scope.model.removeDay(index);
                $scope.numberOfcolumns = $scope.model.days.length;
            }
            //console.log($scope.numberOfcolumns);
        }
        $scope.checkGraphicaLength = function (index) {
            var totalTimeLine = 0;
            if ($scope.model.days[index]._stacked.length) {
                for (var i = 0; i < 4; i++) {
                    totalTimeLine += Number($scope.model.days[index]._stacked[i].value);
                }
            }
            return totalTimeLine;
        }  
        // createTestData(ngmodel.results);
        $scope.removeActivity = function(index){
            $scope.model.removeParkedActivity(index);
        }

        $scope.removeActivityDay = function(indexDay, index){
            console.log("Day "+indexDay);
            console.log("Act "+index);
            $scope.model.removeActivityDay(indexDay, index);
            
        }
        $scope.moveActivityBack = function(indexDay, index){
            $scope.model.moveActivity(indexDay, index, null, null);
        }
    }]);

//angular drag and drop function
angular.module('dragAndDropControllerModule', ['ui.sortable', "modelModule"]).
        controller('dragAndDropCtrl', ['$scope', 'ngmodel', function ($scope, ngmodel) {
                $scope.model = ngmodel.results;
                $scope.parkedActivites = $scope.model.parkedActivities;
                $scope.days = $scope.model.days;
                $scope.sortOptionListener = {
                    accept: function (sourceItemHandleScope, destSortableScope) {
                        //console.log('accepted');
                        return true;
                    }, //override to determine drag is allowed or not. default is true.
                    itemMoved: function (event) {
                        // $scope.updateTimeLine(event);
                        //event.source.itemScope.modelValue = event.dest.sortableScope.$parent.column.name;
                        sourceIndex = event.source.sortableScope.$index;
                        destIndex = event.dest.sortableScope.$index;
                        console.log($scope.days.length);
                        for (var i = 0; i < Number($scope.days.length); i++) {
                            // update the graphical timeline
                            $scope.days[i].upDateGraphicalTimeLine();
                            // update the start and end time of each activity
                            var flag = $scope.days[i]._start;
                            angular.forEach($scope.days[i]._activities, function (activity) {
                                activity.setStart(flag);
                                activity.setEnd(flag + activity.getLength());
                                flag = flag + activity.getLength();
                            });
                        }

                        //console.log($scope.parkedActivites);
                        //  console.log('itemmoved');
                        //console.log($scope.days[0]._activities);
                    }, //Do what you want},
                    orderChanged: function (event) {
                        // update the start and end time of each activity
                        for (var i = 0; i < Number($scope.days.length); i++) {
                            var flag = $scope.days[i]._start;
                            angular.forEach($scope.days[i]._activities, function (activity) {
                                activity.setStart(flag);
                                activity.setEnd(flag + activity.getLength());
                                flag = flag + activity.getLength();
                            });
                        }
                        // console.log('changed');
                        //console.log(event);
                    }, //Do what you want},
                    containment: '#board'//optional param.
                };

            }]);

//angular-bootstrap popup UI// we use this popup for adding new activity
var ngBootstrapUIModule = angular.module('ngBootstrapUIModule', ['modelModule']);
ngBootstrapUIModule.controller('ModalCtrl', ['$scope', '$modal', '$log', 'ngmodel', function ($scope, $modal, $log, ngmodel) {
        $scope.options = ActivityType;
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    options: function () {
                        return $scope.options;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
ngBootstrapUIModule.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "options", "ngmodel", function ($scope, $modalInstance, options, ngmodel) {
        $scope.options = options;
        $scope.activityType = options[0];
        $scope.model = ngmodel.results;

        $scope.ok = function () {
            // $scope.color = $scope.getRandomColor();
            // alert($scope.activityType.value);
            $scope.model.addActivity(new Activity($scope.activityName, Number($scope.activityDuration), $scope.activityType.value, $scope.activityDesc, $scope.activityType.color));
            // console.log($scope.model.parkedActivities[0].getName());
            $modalInstance.close();
            //$modalInstance.close($scope.selected.item);  
        };
        $scope.getRandomColor = function () {

            var val = $scope.activityType.value;
            if (val == 0) {
                var mixedrgb = [0, 255, 83];
            }
            else if (val == 1) {
                var mixedrgb = [255, 251, 0];
            }
            else if (val == 2) {
                var mixedrgb = [125, 97, 255];
            }
            else if (val == 3) {
                var mixedrgb = [255, 40, 40];
            }
            //var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
            //var mix = [brightness * 51, brightness * 51, brightness * 51]; //51 => 255/5
            //var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function (x) {
            //return Math.round(x / 2.0)
            //})
            return "rgb(" + mixedrgb.join(",") + ")";
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);// end of bootstrap modal

maincontrollerModule.controller('TimepickerDemoCtrl', ['$scope', 'ngmodel', function ($scope, ngmodel) {

        var d = new Date();
        d.setHours(8);
        d.setMinutes(0);
        $scope.mytime = d;

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };
        $scope.changed = function (index) {
            ngmodel.results.days[index].setStart($scope.mytime.getHours(), $scope.mytime.getMinutes())
            $scope.updateActivitiesTime();
        };

        $scope.updateActivitiesTime = function () {
            for (var i = 0; i < Number($scope.days.length); i++) {
                var flag = $scope.days[i]._start;
                angular.forEach($scope.days[i]._activities, function (activity) {
                    activity.setStart(flag);
                    activity.setEnd(flag + activity.getLength());
                    flag = flag + activity.getLength();
                });
            }
        }
    }]);
