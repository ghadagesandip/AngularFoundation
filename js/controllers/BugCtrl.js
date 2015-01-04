app.controller('BugCtrl',['$scope','$location','loginFact','BugFactory',function($scope,$location,loginFact,BugFactory){
    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }else{
        BugFactory.myallbugs()
            .success(function(data,status,headers,config){
                $scope.activeproject = 'all';
                $scope.bugs = data.bugs;
                $scope.projects = data.projects;
                $scope.selectedBugId = data.bugs[0].id;
            })
            .error(function(data,status,headers,config){

            })


        $scope.setSelection = function(id){
            $scope.selectedBugId = id;
        }

        $scope.showProject = function(projectId){
            $scope.activeproject = projectId;
        }


        $scope.showProjectsCond = function($projectId){

            if($scope.activeproject==='all'){
                return true;
            }
            return $projectId==$scope.activeproject
        }
    }
}]);