module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            angularjs: {
                files: {
                    'js/build/angular-foundation.min.js': [
                        'js/angular.min.js','js/angular-resource.min.js','js/angular-route.min.js','js/vendor/modernizr.js',
                        'js/vendor/jquery.js','js/foundation.min.js'
                    ]
                }
            }
        },

        concat: {
            myfarah_home: {
                src: [
                    'css/popup.css', 'css/styles_layouts.css', 'css/style.css', 'css/fileuploader.css','css/uniform.default.css',
                    'css/login_popup.css','css/validationEngine.jquery.css','css/ui-custom/jquery-ui.css'
                ],
                dest: 'css/build/myfarah_home.css'
            }
        },

        cssmin: {

            myfarah_home: {
                files: {
                    'css/build/myfarah_home.min.css': 'css/build/myfarah_home.css'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'concat']);

};