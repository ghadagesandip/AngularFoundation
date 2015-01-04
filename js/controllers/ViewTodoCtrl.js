app.controller('ViewTodoCtrl',['$scope','$routeParams','TodoFactory',function($scope,$routeParams,TodoFactory){
    TodoFactory.getTodo($routeParams.id)
        .success(function(data,status,headers,config){
            console.log(data);
            $scope.todo = data;
        })
        .error(function(data,status,headers,config){

        });
}]);