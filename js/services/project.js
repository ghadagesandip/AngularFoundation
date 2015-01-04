app.factory('ProjectFactory',['$http','loginFact','baseUrl',function($http, loginFact, baseUrl){
    return {
        myprojects : function(){
            return $http.get(baseUrl+'my-projects/'+loginFact.getCookie('userId'));
        },
        getProjectDetails : function(id){
            return $http.get(baseUrl+'get-project-details/'+id);
        }
    }
}]);