app.factory('loginFact',['$http','$location','baseUrl',function($http, $location, baseUrl){
    return {

        authenticate : function(credentials){
            return $http.post(baseUrl+'sign-in',credentials);
        },

        setCookie : function(cname,cvalue,exdays){
            exdays = typeof exdays !== 'undefined' ? exdays : 360;
            var d = new Date();
            d.setDate(d.getDate()+(exdays*24*60*60*1000));
            var  expires = "expires="+ d.toUTCString();
            document.cookie = cname+"="+cvalue+";"+expires;

        },

        getCookie : function(cname){
            var name = cname+"=";
            var ca = document.cookie.split(';');
            for(i=0; i<ca.length; i++){
                var c = ca[i];
                while(c.charAt(0)==' ')  c = c.substring(1);
                if(c.indexOf(name)!='-1') return c.substring(name.length, c.length);
            }
            return "";
        },

        isLoggedIn : function(){
            var userId =   this.getCookie('userId');

            if(typeof userId == 'undefined' || userId==""){
                return false
            }
            return true;

        },

        getName : function(){

            if(this.isLoggedIn()){
                return this.getCookie('name');
            }else{
                $location.path('/home');
            }
        },

        deleteCookies : function(){
            document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            document.cookie = "roleId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            return !this.isLoggedIn();
        }


    }
}]);