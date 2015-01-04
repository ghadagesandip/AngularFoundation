app.controller('ViewRoleCtrl',['$scope','$routeParams','$location','RoleFactory',function($scope,$routeParams,$location,RoleFactory){

    RoleFactory.getRole($routeParams.roleId)
        .success(function(result){
            $scope.role = result;
        })
        .error(function(error){
            console.log(error);
        });
}]);