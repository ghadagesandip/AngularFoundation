app.factory('RoleFactory',['$http','baseUrl' ,function ($http,baseUrl) {
    return{
        getRoles:function(){
            return $http.get(baseUrl+'getRolesList');
        },
        getRole:function(id){
            return $http.get(baseUrl+'getRole/'+id);
        },
        upadateRole : function(post){
            return $http.post(baseUrl+'upadateRole',post)
        }
    }
}]);