

app.controller('UpdateTodoCtrl',['$scope','$routeParams','$location','TodoFactory',function($scope,$routeParams,$location,TodoFactory){
    $scope.submitted = false;
    TodoFactory.getTodo($routeParams.id)
        .success(function(data,status,headers,config){
            $scope.todo = data.todo;

            $scope.projects = data.projects;
            angular.forEach($scope.projects,function(val,key){
                if($scope.todo.project_id===(val.id)){
                    $scope.selectedproject_id = $scope.projects[key];
                }
            });


            $scope.groups = data.todogroups;
            angular.forEach($scope.groups,function(val,key){
                if($scope.todo.group_id===(val.id)){
                    $scope.selectedgroup_id = $scope.groups[key];
                }
            });


            $scope.priorities = data.todoPriorities;
            angular.forEach($scope.priorities,function(val,key){
                if($scope.todo.priority_id===(val.id)){
                    $scope.selectedpriority_id = $scope.priorities[key];
                }
            });


        })
        .error(function(data, status, headers, config){
            $scope.status = "Error occured while fetching data";
        });


    $scope.updateTodo = function(){

        $scope.submitted = true;
        if(!$scope.frmUpdateTodo.$valid){
            return false;
        }

        if(typeof $scope.selectedproject_id != "undefined" || typeof $scope.selectedproject_id != null){
            $scope.todo.project_id = null;
        }else{
            $scope.todo.project_id = $scope.selectedproject_id.id;
        }
        $scope.todo.group_id = $scope.selectedgroup_id.id;
        $scope.todo.priority_id = $scope.selectedpriority_id.id;

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