app.controller('AddBugCtrl',['$scope','$location','loginFact','BugFactory','$routeParams',function($scope, $location, loginFact, BugFactory,$routeParams){

    $scope.submitted = false;

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }else{
        BugFactory.getProjectsAndbugType()
            .success(function(data,status,headers,config){
                $scope.projects = data.projects;
                $scope.bugtypes = data.bugtypes;
                $scope.projectUsers = {}
            })
            .error(function(){

            })


        $scope.addBug = function(){
            
            $scope.submitted = true;

            if(!$scope.frmbug.$valid){
                return false;
            }

            $scope.bug.assigned_by = loginFact.getCookie('userId');
            $scope.bug.bug_status_id = 1;
            $scope.bug.bug_type_id = $scope.bug.bug_type_id.id;
            $scope.bug.assigned_to = $scope.bug.assigned_to.id;
            BugFactory.addBug($scope.bug)
                .success(function(data,status,headers,config){
                    $location.path('/bugs');
                })
                .error(function(data,status,headers,config){

                });
        }



        $scope.loadProjects = function(){

            BugFactory.getProjectUsers($scope.bug.project_id.id)
                .success(function(data,status,headers,config){
                    $scope.projectUsers = data;
                })
                .error(function(data,status,headers,config){

                })
        }
    }
}]);