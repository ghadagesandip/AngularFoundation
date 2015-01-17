app.controller('AddTodoCtrl',['$scope','$location','loginFact','ProjectFactory','TodoFactory',function($scope,$location,loginFact,ProjectFactory,TodoFactory){

    $scope.submitted = false;

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }else{
        ProjectFactory.myprojects()
            .success(function(data,status,headers,config){
                $scope.projects = data.data.projects;
                $scope.selectedproject_id = $scope.projects[0];

                $scope.groups = data.data.todogroups;
                $scope.selectedgroup_id = $scope.groups[0];

                $scope.priorities = data.data.todoPriority;
                $scope.selectedpriority_id = $scope.priorities[$scope.priorities.length-1];

            })
            .error(function(data,status,headers,config){

            })


        $scope.saveTodo = function(){

            $scope.submitted = true;

            if(!$scope.frmAddTodo.$valid){
                return false;
            }
            $scope.todo.user_id = loginFact.getCookie('userId');
            $scope.todo.project_id = $scope.selectedproject_id.id;
            $scope.todo.group_id = $scope.selectedgroup_id.id;
            $scope.todo.priority_id = $scope.selectedpriority_id.id;

            TodoFactory.saveTodo($scope.todo)
                .success(function(result){
                    $scope.todos = {}
                    $scope.status = 'todo saved';
                    $location.path('/todos');
                })
                .error(function(){

                });
        }


        $scope.UpdateStatus = function(){
            $scope.todo.todo_status = $scope.todo.todo_status;
        }


    }

}]);