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
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);

};