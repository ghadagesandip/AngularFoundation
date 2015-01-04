app.factory('UserFactory',['$http','baseUrl',function($http,baseUrl){
    return {
        getUsers : function(){
            return $http.get(baseUrl+'getUsers');
        }
    }
}]);