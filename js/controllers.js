// intilaie the controller module
var maincontrollerModule = angular.module('maincontrollerModule', ["modelModule"]);
maincontrollerModule.controller('MainCtrl', ['$scope', 'ngmodel', function ($scope, ngmodel) {
        $scope.tomas = 'age';
        $scope.model = ngmodel.results;
        $scope.model.addDay();
        $scope.model.addActivity(new Activity("Introduction", 10, 0, ""), 0);
        angular.forEach(ActivityType, function (sample, index) {
            console.log("Day '" + ActivityType[index] + "' Length: " + $scope.model.days[0].getLengthByType(index) + " min");
        });
        // createTestData(ngmodel.results);
    }]);

//drag and drop controller// this controller will take care of drag and drop activity
var dragAndDropControllerModule = angular.module('dragAndDropControllerModule', ['ngDraggable']).
        controller('DragAndDropCtrl', function ($scope) {
            $scope.centerAnchor = true;
            $scope.toggleCenterAnchor = function () {
                $scope.centerAnchor = !$scope.centerAnchor
            }
            $scope.draggableObjects = [{name: 'one'}, {name: 'two'}, {name: 'three'}];
            $scope.droppedObjects1 = [];
            $scope.droppedObjects2 = [];
            $scope.onDropComplete1 = function (data, evt) {
                var index = $scope.droppedObjects1.indexOf(data);
                if (index == -1)
                    $scope.droppedObjects1.push(data);
            }
            $scope.onDragSuccess1 = function (data, evt) {
                console.log("133", "$scope", "onDragSuccess1", "", evt);
                var index = $scope.droppedObjects1.indexOf(data);
                if (index > -1) {
                    $scope.droppedObjects1.splice(index, 1);
                }
            }
            $scope.onDragSuccess2 = function (data, evt) {
                var index = $scope.droppedObjects2.indexOf(data);
                if (index > -1) {
                    $scope.droppedObjects2.splice(index, 1);
                }
            }
            $scope.onDropComplete2 = function (data, evt) {
                var index = $scope.droppedObjects2.indexOf(data);
                if (index == -1) {
                    $scope.droppedObjects2.push(data);
                }
            }
            var inArray = function (array, obj) {
                var index = array.indexOf(obj);
            }
        });


//angular-bootstrap popup UI// we use this popup for adding new activity
var ngBootstrapUIModule = angular.module('ngBootstrapUIModule', ['ui.bootstrap']);
ngBootstrapUIModule.controller('ModalCtrl', function ($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];    
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
ngBootstrapUIModule.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});// end of bootstrap modal
