var app = angular.module('project', ['ngRoute','ngAnimate'])
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
