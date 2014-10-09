var app = angular.module('project', ['ngRoute'])
    app.value('baseUrl','http://10.0.11.98/BugTrackerApp/public/');
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', { title:"Login", controller:'LoginCtrl', templateUrl:'Views/login.html' })
            .when('/login', { title:"Login", controller:'LoginCtrl', templateUrl:'Views/login.html' })
            .when('/logout', { title:"Logout", controller:'LogoutCtrl', template:'' })
            .when('/home', { title:"Home", controller:'DashboardCtrl', templateUrl:'Views/dashboard.html' })

            .when('/roles',{title:"Role",controller:'ListRoleCtrl',templateUrl:'Views/Roles/listroles.html'})
            .when('/add-new-role',{title:"Add Role",controller:'AddRoleCtrl',templateUrl:'Views/Roles/add-role.html'})
            .when('/view-role/:roleId',{title:"Add Role",controller:'ViewRoleCtrl',templateUrl:'Views/Roles/view-role.html'})
            .when('/update-role/:roleId',{title:"Update Role",controller:"UpdateRole",templateUrl:'Views/Roles/update-role.html'})

            .when('/users',{title:"Users",controller:'ListUsersCtrl',templateUrl:'Views/Users/listusers.html'})
            .when('/my-projects',{title:"Project",controller:'ListProjectCtrl',templateUrl:'Views/MyProjects/listprojects.html'})
            .when('/view-project-details/:id',{title:"View Project Details",controller:'ViewDetailsProjectCtrl',templateUrl:'Views/MyProjects/project-details.html'})

            .when('/bug-types',{title:"Bug types",controller:'ListBugTypeCtrl',templateUrl:'Views/BugTypes/listbugtypes.html'})
            .when('/bug-status',{title:"Bug Status",controller:'BugStatusCtrl',templateUrl:'Views/BugStatus/listbugstatus.html'})
            .when('/bugs',{title:"Bugs",controller:"BugCtrl",templateUrl:'Views/Bugs/listbugs.html'})
            .when('/bugs/project/:id',{title:"Bugs",controller:"BugCtrl",templateUrl:'Views/Bugs/listbugs.html'})
            .when('/add-new-bug',{title:"Add new bug",controller:"AddBugCtrl",templateUrl:'Views/Bugs/add-bug.html'})
            .when('/view-bug-details/:id',{title:"View project details", controller:"ViewBugDetails",templateUrl:'Views/Bugs/view-bug-details.html'})

            .when('/todos',{title:"TODO List",controller:"TodoCtrl",templateUrl:'Views/Todos/index.html'})
            .when('/todos/project/:projectId',{title:"TODO List",controller:"TodoCtrl",templateUrl:'Views/Todos/index.html'})
            .when('/add-new-todo',{title:"Add TODO",controller:"AddTodoCtrl",templateUrl:'Views/Todos/add-todo.html'})
            .when('/update-todo/:id',{title:"Update TODO",controller:"UpdateTodoCtrl",templateUrl:'Views/Todos/update-todo.html'})
            .when('/view-todo/:id',{title:"View TODO",controller:"ViewTodoCtrl",templateUrl:'Views/Todos/view-todo.html'})
            .otherwise({redirectTo:'/'});
    }]);




    app.run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
        });
    }]);


    app.directive('autherror',function(){
       return{
           restrict:"E",
           replace:true,
           scope:{
               feedback:"="
           },
           template:"<div class='round alert label'> {{feedback}}</div>"
       }
    });


    app.directive('setactive',function(){
       return {
           scope :{},
           link : function(scope, element, attr){
                element.on('click',function(){
                    element.parent().children().removeClass('active');
                    element.addClass('active');
                })
           }
       }
    });

    app.directive('emptytr',function(){

        return {
           restrict:"E",
           replace : true,
           scope:{
               dataarr : "="
           },
           template:"<div data-ng-show='!dataarr' class='text-center'><span class='round alert label'>No records found</span></div>"
       }
    });



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


    app.factory('UserFactory',['$http','baseUrl',function($http,baseUrl){
       return {
           getUsers : function(){
               return $http.get(baseUrl+'getUsers');
           }
       }
    }]);



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
                return $http.get(baseUrl+'getTodo/'+id);
            },
            updateTodo : function(id,todo){
                return $http.put(baseUrl+'updateTodo/'+id,todo);
            },
            deleteTodo : function(id){
                return $http.delete(baseUrl+'deleteTodo/'+id)
            }
        }
    }]);


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
















    app.controller('DashboardCtrl', ['$scope','loginFact',function($scope, loginFact) {
        if(!loginFact.isLoggedIn()){
            $location.path('/login');
        }
    }]);




    app.controller('ListRoleCtrl',['$scope','RoleFactory',function($scope,RoleFactory){

            RoleFactory.getRoles()
                .success(function (result) {
                    $scope.roles = result
                })
                .error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });


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




    app.controller('ListProjectCtrl',['$scope','$location','ProjectFactory','loginFact',function($scope,$location,ProjectFactory,loginFact){
            if(!loginFact.isLoggedIn()){
                $location.path('/login');
            }else{
                ProjectFactory.myprojects()
                    .success(function(data,status,headers,config){
                        $scope.projects = data;

                    })
                    .error(function(data,status,headers,config){

                    })
            }
    }]);


    app.controller('ViewDetailsProjectCtrl',['$scope','$location','$routeParams','ProjectFactory',function($scope,$location,$routeParams,ProjectFactory){
        ProjectFactory.getProjectDetails($routeParams.id)
            .success(function(data,status,headers,config){
                $scope.project = data;
            })
            .error(function(data,status,headers,config){

            })
    }]);


    app.controller('ListBugTypeCtrl',['$scope',function($scope){

    }]);

    app.controller('ListBugStatus',['$scope', function ($scope){

    }]);


    app.controller('BugCtrl',['$scope','$location','loginFact','BugFactory',function($scope,$location,loginFact,BugFactory){
        if(!loginFact.isLoggedIn()){
            $location.path('/login');
        }else{
            BugFactory.myallbugs()
                .success(function(data,status,headers,config){
                    $scope.activeproject = 'all';
                    $scope.bugs = data.bugs;
                    $scope.projects = data.projects;
                    $scope.selectedBugId = data.bugs[0].id;
                })
                .error(function(data,status,headers,config){

                })


            $scope.setSelection = function(id){
                $scope.selectedBugId = id;
            }

            $scope.showProject = function(projectId){
                $scope.activeproject = projectId;
            }


            $scope.showProjectsCond = function($projectId){

                if($scope.activeproject==='all'){
                    return true;
                }
                return $projectId==$scope.activeproject
            }
        }
    }]);


    app.controller('ViewBugDetails',['$scope','$location','$routeParams','loginFact','BugFactory',function($scope,$location,$routeParams,loginFact,BugFactory){
         if(!loginFact.isLoggedIn()){
             $location.path('/');
         }else{
             $scope.errormessage= false;
             BugFactory.getBugDetails($routeParams.id)
                 .success(function(data,status,headers,config){
                    $scope.bug= data;
                 })
                 .error(function(data,status,headers,config){
                    $scope.errormessage = "Sorry, error occured while fetching data. Error code : "+status;
                 })
         }
    }]);


    app.controller('AddBugCtrl',['$scope','$location','loginFact','BugFactory','$routeParams',function($scope, $location, loginFact, BugFactory,$routeParams){
         if(!loginFact.isLoggedIn()){
             $location.path('/login');
         }else{
             BugFactory.getProjectsAndbugType()
                 .success(function(data,status,headers,config){
                     $scope.projects = data.projects;
                     $scope.bugtypes = data.bugtypes;
                     $scope.projectUsers = {}
                 })
                 .error(function(){

                 })

             $scope.addBug = function(){
                 $scope.bug.assigned_by = loginFact.getCookie('userId');
                 $scope.bug.project_id = $scope.bug.project_id.id;
                 $scope.bug.bug_status_id = 1;
                 $scope.bug.bug_type_id = $scope.bug.bug_type_id.id;
                 $scope.bug.assigned_to = $scope.bug.assigned_to.id;
                 BugFactory.addBug($scope.bug)
                     .success(function(data,status,headers,config){
                        $location.path('/bugs');
                     })
                     .error(function(data,status,headers,config){

                     });
             }

             $scope.loadProjects = function(){

                 BugFactory.getProjectUsers($scope.bug.project_id.id)
                     .success(function(data,status,headers,config){
                        $scope.projectUsers = data;
                     })
                     .error(function(data,status,headers,config){

                     })
             }
         }
    }]);



    app.controller('TodoCtrl',['$scope','$location','$routeParams','loginFact','TodoFactory',function($scope,$location, $routeParams, loginFact, TodoFactory){
           if(!loginFact.isLoggedIn()){
               $location.path('/login');
           }else{

               TodoFactory.getTodos($routeParams.projectId)
                   .success(function(data,status,headers,config){
                       $scope.todos = data.todos;
                       $scope.projects = data.projects;
                       $scope.activeproject = typeof $routeParams.projectId !== 'undefined' ? $routeParams.projectId : 'all';

                   })
                   .error(function(data,status,headers,config){
                       $scope.status = 'Error occured while fetching data';
                   })

               $scope.deleteTodo = function(id){
                   var title = $scope.todos[id].title;
                   TodoFactory.deleteTodo(this.todo.id)
                       .success(function(data,status,headers,config){
                           if(status ==200){
                               $scope.todos.splice(id, 1);
                               $scope.status = "Delete todo : "+title;
                           }
                       })
                       .error(function(data,status,headers,config){

                       });

               }

           }

    }]);


    app.controller('AddTodoCtrl',['$scope','$location','loginFact','ProjectFactory','TodoFactory',function($scope,$location,loginFact,ProjectFactory,TodoFactory){

        if(!loginFact.isLoggedIn()){
            $location.path('/login');
        }else{
            ProjectFactory.myprojects()
                .success(function(data,status,headers,config){
                    $scope.projects = data;

                })
                .error(function(data,status,headers,config){

                })


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


            $scope.UpdateStatus = function(){
                $scope.todo.todo_status = $scope.todo.todo_status;
            }


        }


    }]);


    app.controller('ViewTodoCtrl',['$scope','$routeParams','TodoFactory',function($scope,$routeParams,TodoFactory){
        TodoFactory.getTodo($routeParams.id)
            .success(function(data,status,headers,config){
                console.log(data);
                $scope.todo = data;
            })
            .error(function(data,status,headers,config){

            });
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


    app.controller('LoginCtrl',['$scope','$location','loginFact',function($scope,$location,loginFact){

        $scope.loginerror = false;
        $scope.ctrlerror = '';

        if(loginFact.isLoggedIn()){
            $location.path('/home');
        }

        $scope.loginUser = function(){
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


    app.controller('LogoutCtrl',['$scope','$location','loginFact',function($scope,$location,loginFact){
        if(loginFact.deleteCookies()){
            $location.path('/login');
        }
    }]);




