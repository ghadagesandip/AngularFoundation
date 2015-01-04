app.controller('ListRoleCtrl',['$scope','RoleFactory',function($scope,RoleFactory){

    RoleFactory.getRoles()
        .success(function (result) {
            $scope.roles = result
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });


}]);