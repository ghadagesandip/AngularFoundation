app.controller('ListUsersCtrl',['$scope','UserFactory',function($scope,UserFactory){
    showUsers();
    function showUsers(){
        UserFactory.getUsers()
            .success(function(result){
                $scope.users = result;
            })
            .error(function(error){
                $scope.status = 'Unable to fetch user data'+error.statusText;
            })
    }
}]);

