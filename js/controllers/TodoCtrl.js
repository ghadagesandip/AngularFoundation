app.controller('TodoCtrl',['$scope','$location','$routeParams','loginFact','TodoFactory',function($scope,$location, $routeParams, loginFact, TodoFactory){
    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }else{

        TodoFactory.getTodos($routeParams.projectId)
            .success(function(data,status,headers,config){
                $scope.todos = data.todos;
                $scope.projects = data.projects;
                $scope.activeproject = typeof $routeParams.projectId !== 'undefined' ? $routeParams.projectId : 'all';

            })
            .error(function(data,status,headers,config){
                $scope.status = 'Error occured while fetching data';
            })

        $scope.deleteTodo = function(id){
            var title = $scope.todos[id].title;
            TodoFactory.deleteTodo(this.todo.id)
                .success(function(data,status,headers,config){
                    if(status ==200){
                        $scope.todos.splice(id, 1);
                        $scope.status = "Delete todo : "+title;
                    }
                })
                .error(function(data,status,headers,config){

                });

        }

    }

}]);

