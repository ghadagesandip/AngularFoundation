app.controller('UpdateRole',['$scope','$routeParams','$location','RoleFactory',function($scope,$routeParams,$location,RoleFactory){
    RoleFactory.getRole($routeParams.roleId)
        .success(function(result){
            $scope.role = result;
        })
        .error(function(error){
        });

    $scope.upadateRole = function(){

        RoleFactory.upadateRole($scope.role)
            .success(function(data,status){
                console.log(data); return false;
                $scope.role = {}
                $location.path('/roles');
            })
    }
}]);