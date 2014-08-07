var app = angular.module('project', ['ngRoute'])

    app.value('baseUrl','http://localhost/laravel/public/');
    app.config(function($routeProvider) {
        $routeProvider
            .when('/', { title:"Dashboard", controller:'DashboardCtrl', templateUrl:'Views/dashboard.html' })
            .when('/roles',{title:"Role",controller:'ListRoleCtrl',templateUrl:'Views/Roles/listroles.html'})
            .when('/users',{title:"Users",controller:'ListUsersCtrl',templateUrl:'Views/Users/listusers.html'})
            .when('/projects',{title:"Project",controller:'ListProjectCtrl',templateUrl:'Views/Projects/listprojects.html'})
            .when('/bug-types',{title:"Bug types",controller:'ListBugTypeCtrl',templateUrl:'Views/BugTypes/listbugtypes.html'})
            .when('/bug-status',{title:"Bug Status",controller:'BugStatusCtrl',templateUrl:'Views/BugStatus/listbugstatus.html'})
            .when('/bugs',{title:"Bugs",controller:"BugCtrl",templateUrl:'Views/Bugs/listbugs.html'})
            .otherwise({redirectTo:'/'});
    });



    app.run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
        });
    }]);




    app.factory('RoleFactory', function ($http,baseUrl) {
        return{
            getRoles:function(){
                return $http.get(baseUrl+'roles/getRolesList');
            }
        }
    });


    app.factory('UserFactory',function($http,baseUrl){
       return {
           getUsers : function(){
               return $http.get(baseUrl+'users/getUsers');
           }
       }
    });

    app.controller('DashboardCtrl', ['$scope',function($scope) {

    }]);

    app.controller('ListRoleCtrl',['$scope','RoleFactory',function($scope,RoleFactory){
        showRoles();
        function showRoles(){
            RoleFactory.getRoles()
                .success(function (result) {
                    $scope.roles = result
                })
                .error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });

        }
    }]);

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

    app.controller('ListProjectCtrl',['$scope',function($scope){

    }]);

    app.controller('ListBugTypeCtrl',['$scope',function($scope){

    }]);

    app.controller('ListBugStatus',['$scope', function ($scope){

    }]);

    app.controller('BugCtrl',['$scope',function($scope){

    }]);