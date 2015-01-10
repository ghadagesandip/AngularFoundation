app.controller('LoginCtrl',['$scope','$location','loginFact',function($scope,$location,loginFact){

        $scope.loginerror = false;
        $scope.ctrlerror = '';
        $scope.submitted = false;


        if(loginFact.isLoggedIn()){
            $location.path('/home');
        }

        $scope.loginUser = function(){
            $scope.submitted = true;

            if(!$scope.loginForm.$valid){
                return false;
            }

            loginFact.authenticate($scope.login)
                .success(function(data, status, headers, config){
                    $scope.loginerror = !data.login;
                    if(data.login===false && status==200){
                        //login failed
                        $scope.ctrlerror = data.message;
                    }else{
                        // login successfull
                        $scope.ctrlerror = '';
                        loginFact.setCookie('userId',data.user.id,360);
                        loginFact.setCookie('roleId',data.user.role_id,360);
                        loginFact.setCookie('name',data.user.first_name+' '+data.user.last_name,360);
                        $location.path('/home');
                    }
                })
                .error(function(data, status, headers, config){
                    $scope.loginerror = true;
                    $scope.ctrlerror = 'Error occured, error code '+status
                })

        }
    }]);