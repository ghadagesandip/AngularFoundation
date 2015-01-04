app.controller('ViewDetailsProjectCtrl',['$scope','$location','$routeParams','ProjectFactory',function($scope,$location,$routeParams,ProjectFactory){
    ProjectFactory.getProjectDetails($routeParams.id)
        .success(function(data,status,headers,config){
            $scope.project = data;
        })
        .error(function(data,status,headers,config){

        })
}]);