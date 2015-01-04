app.controller('DashboardCtrl', ['$scope','loginFact',function($scope, loginFact) {
    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }
}]);
