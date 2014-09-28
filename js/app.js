var app = angular.module('project', ['ngRoute'])
    app.value('baseUrl','http://10.0.11.98/BugTrackerApp/public/');
    app.config(function($routeProvider) {
        $routeProvider
            .when('/', { title:"Login", controller:'LoginCtrl', templateUrl:'Views/login.html' })
            .when('/home', { title:"Home", controller:'DashboardCtrl', templateUrl:'Views/dashboard.html' })

            .when('/roles',{title:"Role",controller:'ListRoleCtrl',templateUrl:'Views/Roles/listroles.html'})
            .when('/add-new-role',{title:"Add Role",controller:'AddRoleCtrl',templateUrl:'Views/Roles/add-role.html'})
            .when('/view-role/:roleId',{title:"Add Role",controller:'ViewRoleCtrl',templateUrl:'Views/Roles/view-role.html'})
            .when('/update-role/:roleId',{title:"Update Role",controller:"UpdateRole",templateUrl:'Views/Roles/update-role.html'})

            .when('/users',{title:"Users",controller:'ListUsersCtrl',templateUrl:'Views/Users/listusers.html'})
            .when('/projects',{title:"Project",controller:'ListProjectCtrl',templateUrl:'Views/Projects/listprojects.html'})
            .when('/bug-types',{title:"Bug types",controller:'ListBugTypeCtrl',templateUrl:'Views/BugTypes/listbugtypes.html'})
            .when('/bug-status',{title:"Bug Status",controller:'BugStatusCtrl',templateUrl:'Views/BugStatus/listbugstatus.html'})
            .when('/bugs',{title:"Bugs",controller:"BugCtrl",templateUrl:'Views/Bugs/listbugs.html'})

            .when('/todos',{title:"TODO List",controller:"TodoCtrl",templateUrl:'Views/Todos/index.html'})
            .when('/add-new-todo',{title:"Add TODO",controller:"AddTodoCtrl",templateUrl:'Views/Todos/add-todo.html'})
            .when('/update-todo/:id',{title:"Update TODO",controller:"UpdateTodoCtrl",templateUrl:'Views/Todos/update-todo.html'})
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
                return $http.get(baseUrl+'getRolesList');
            },
            getRole:function(id){
                return $http.get(baseUrl+'getRole/'+id);
            },
            upadateRole : function(post){
                return $http.post(baseUrl+'upadateRole',post)
            }
        }
    });


    app.factory('UserFactory',function($http,baseUrl){
       return {
           getUsers : function(){
               return $http.get(baseUrl+'getUsers');
           }
       }
    });



    app.factory('TodoFactory',function($http,baseUrl){
        return {
            getTodos : function(){
                return $http.get(baseUrl+'getTodos/'+1);
            },
            saveTodo : function(todo){
                return $http.post(baseUrl+'saveTodo',todo);
            },
            getTodo : function(id){
                return $http.get(baseUrl+'getTodo/'+id);
            },
            updateTodo : function(id,todo){
                return $http.put(baseUrl+'updateTodo/'+id,todo);
            }
        }
    });


    app.factory("Project",function($http,baseUrl){
        return {
            getAllActiveProjectListByUser : function(){
                return $http.get(baseUrl+'getAllActiveProjectListByUser/'+1);
            }
        }
    });

















    app.controller('DashboardCtrl', ['$scope',function($scope) {

    }]);

    app.controller('ListRoleCtrl',['$scope','RoleFactory',function($scope,RoleFactory){

        //showRoles();
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

    app.controller('AddRoleCtrl',['$scope','RoleFactory',function($scope,RoleFactory){

    }]);

    app.controller('ViewRoleCtrl',['$scope','$routeParams','$location','RoleFactory',function($scope,$routeParams,$location,RoleFactory){

        RoleFactory.getRole($routeParams.roleId)
            .success(function(result){
                $scope.role = result;
            })
            .error(function(error){
               console.log(error);
            });
    }]);



    app.controller('UpdateRole',['$scope','$routeParams','$location','RoleFactory',function($scope,$routeParams,$location,RoleFactory){
        RoleFactory.getRole($routeParams.roleId)
            .success(function(result){
                 $scope.role = result;
            })
            .error(function(error){
        });

        $scope.upadateRole = function(){

            RoleFactory.upadateRole($scope.role)
                .success(function(data,status){
                    console.log(data); return false;
                    $scope.role = {}
                    $location.path('/roles');
                })
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


    app.controller('TodoCtrl',['$scope','TodoFactory',function($scope,TodoFactory){

          TodoFactory.getTodos()
                .success(function(result){
                    $scope.todos = result;
                })
                .error(function(error){
                    $scope.status = 'Error occured while fetching data'+error.statusText;
                })

    }]);


    app.controller('AddTodoCtrl',['$scope','$location','TodoFactory',function($scope,$location,TodoFactory){

        $scope.projects = [
            {id:1, name:'ESI-QMS Project'},
            {id:2, name:'Pixcelcms Project'},
            {id:3, name:'Myfarah Project'},
        ];

        $scope.saveTodo = function(){
            $scope.todo.user_id = 1;
            $scope.todo.project_id = 1;
            TodoFactory.saveTodo($scope.todo)
                .success(function(result){
                    $scope.todos = {}
                    $scope.status = 'todo saved';
                    $location.path('/todos');
                })
                .error(function(){

                });
        }
    }]);


    app.controller('UpdateTodoCtrl',['$scope','$routeParams','$location','TodoFactory',function($scope,$routeParams,$location,TodoFactory){
        TodoFactory.getTodo($routeParams.id)
            .success(function(data,status,headers,config){
               $scope.todo = data;
            })
            .error(function(data, status, headers, config){
                $scope.status = "Error occured while fetching data";
            });


        $scope.updateTodo = function(){
            TodoFactory.updateTodo($routeParams.id,$scope.todo)
                .success(function(data, status, headers, config){
                    if(status ==200){
                        $location.path('/todos');
                    }
                })
                .error(function(data, status, headers, config){

                });
        }
    }]);


    app.controller('LoginCtrl',['$scope','$window',function($scope,$window){

    }]);
