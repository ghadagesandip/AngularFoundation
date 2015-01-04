app.controller('LogoutCtrl',['$scope','$location','loginFact',function($scope,$location,loginFact){
    if(loginFact.deleteCookies()){
        $location.path('/login');
    }
}]);
