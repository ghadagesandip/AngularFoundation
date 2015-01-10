app.controller('ViewTodoCtrl',['$scope','$routeParams','TodoFactory',function($scope,$routeParams,TodoFactory){
    TodoFactory.getTodo($routeParams.id)
        .success(function(data,status,headers,config){
            $scope.todo = data.todo;
        })
        .error(function(data,status,headers,config){

        });
}]);