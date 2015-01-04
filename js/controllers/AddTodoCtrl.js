app.controller('AddTodoCtrl',['$scope','$location','loginFact','ProjectFactory','TodoFactory',function($scope,$location,loginFact,ProjectFactory,TodoFactory){

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }else{
        ProjectFactory.myprojects()
            .success(function(data,status,headers,config){
                $scope.projects = data;

            })
            .error(function(data,status,headers,config){

            })


        $scope.saveTodo = function(){
            $scope.todo.user_id = loginFact.getCookie('userId');
            $scope.todo.project_id =$scope.todo.project_id.id;
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