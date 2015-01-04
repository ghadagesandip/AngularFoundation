app.factory('TodoFactory',['$http','loginFact','$location','baseUrl',function($http, loginFact, $location, baseUrl){

    return {
        getTodos : function(projectId){
            projectId = typeof projectId !== 'undefined' ? '/'+projectId : '';
            return $http.get(baseUrl+'getTodos/'+loginFact.getCookie('userId')+projectId);
        },
        saveTodo : function(todo){
            return $http.post(baseUrl+'saveTodo',todo);
        },
        getTodo : function(id){
            return $http.get(baseUrl+'getTodo/'+id+'/'+loginFact.getCookie('userId'));
        },
        updateTodo : function(id,todo){
            return $http.put(baseUrl+'updateTodo/'+id,todo);
        },
        deleteTodo : function(id){
            return $http.delete(baseUrl+'deleteTodo/'+id)
        }
    }
}]);