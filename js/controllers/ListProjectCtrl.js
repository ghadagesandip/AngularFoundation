
app.controller('ListProjectCtrl',['$scope','$location','ProjectFactory','loginFact',function($scope,$location,ProjectFactory,loginFact){
    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }else{
        ProjectFactory.myprojects()
            .success(function(data,status,headers,config){
                $scope.projects = data;

            })
            .error(function(data,status,headers,config){

            })
    }
}]);
