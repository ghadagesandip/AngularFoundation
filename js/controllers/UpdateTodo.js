

app.controller('UpdateTodoCtrl',['$scope','$routeParams','$location','TodoFactory',function($scope,$routeParams,$location,TodoFactory){
    TodoFactory.getTodo($routeParams.id)
        .success(function(data,status,headers,config){
            $scope.todo = data.todo;
            console.log(data.todo.todo_date)
            $scope.projects = data.projects;
            var project = 0;
            angular.forEach(data.projects,function(key, val){
                if(key.id==data.todo.project_id){
                    project = val;
                }
            });
            $scope.todo.project_id = data.projects[project];

        })
        .error(function(data, status, headers, config){
            $scope.status = "Error occured while fetching data";
        });


    $scope.updateTodo = function(){
        $scope.todo.project_id = $scope.todo.project_id.id;
        TodoFactory.updateTodo($routeParams.id,$scope.todo)
            .success(function(data, status, headers, config){
                if(status ==200){
                    $location.path('/todos');
                }
            })
            .error(function(data, status, headers, config){

            });
    }
}]);