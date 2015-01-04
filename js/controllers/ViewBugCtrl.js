app.controller('ViewBugDetails',['$scope','$location','$routeParams','loginFact','BugFactory',function($scope,$location,$routeParams,loginFact,BugFactory){
    if(!loginFact.isLoggedIn()){
        $location.path('/');
    }else{
        $scope.errormessage= false;
        BugFactory.getBugDetails($routeParams.id)
            .success(function(data,status,headers,config){
                $scope.bug= data;
            })
            .error(function(data,status,headers,config){
                $scope.errormessage = "Sorry, error occured while fetching data. Error code : "+status;
            })
    }
}]);
