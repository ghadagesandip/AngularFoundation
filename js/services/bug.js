app.factory('BugFactory',['$http','loginFact','baseUrl',function($http, loginFact, baseUrl){

    return {
        myallbugs : function(){
            return $http.get(baseUrl+'get-all-bugs/'+loginFact.getCookie('userId'))
        },
        getProjectsAndbugType: function(){
            return $http.get(baseUrl+'getProjectsAndbugType/'+loginFact.getCookie('userId'))
        },
        addBug : function(bugData){
            return $http.post(baseUrl+'add-bug',bugData);
        },
        getProjectUsers : function(projectId){
            return $http.get(baseUrl+'get-project-users/'+projectId);
        },
        getBugDetails : function(bugId){
            return $http.get(baseUrl+'get-bug-details/'+bugId);
        }
    }
}]);