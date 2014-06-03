module.exports = function (grunt) {

    var data = require('./package.json'),
        cerberus = require('./cerberus'),
        server = {
            build:3031,
            release:3032
        },
        lessOptions = {
            compress:false
        };

    var config = {
        /* Meta Data
        ---------------------------------------------- */
        data:grunt.file.readJSON('package.json'),

        /* File Paths
        ---------------------------------------------- */
        paths: {
            folder: {
                build: 'build/',
                commonBuild: 'build/common/',
                release: 'release/',
                commonRelease: 'release/common/'
            },
            source: {
                html: '<%= paths.folder.build %>**/*.html',
                less: '<%= paths.folder.build %>**/*.less',
                project: '<%= paths.folder.commonBuild %>less/project.less',
                bootstrap: '<%= paths.folder.commonBuild %>less/bootstrap.less',
                bootstrapResponsive: '<%= paths.folder.commonBuild %>less/responsive.less',
                css: '<%= paths.folder.commonBuild %>css/**/*.css',
                js: '<%= paths.folder.commonBuild %>js/**/*.js'
            },
            output: {
                project: '<%= paths.folder.commonBuild %>css/global.css',
                bootstrap: '<%= paths.folder.commonBuild %>css/bootstrap.css',
                bootstrapResponsive: '<%= paths.folder.commonBuild %>css/bootstrap-responsive.css'
            }
        },
        /* File Operation Tasks
        ---------------------------------------------- */
        watch:{
            html:{
                files:'<%= paths.source.html %>',
                tasks:['release']
            },
            less:{
                files:'<%= paths.source.less %>',
                tasks:['less']
            }
        },
        copy:{
            release:{
                files:[
                    {
                        cwd:'<%= paths.folder.build %>',
                        src:['**/*'],
                        dest:'<%= paths.folder.release %>',
                        expand:true
                    }
                ]
            }
        },
        clean:{
            prepareRelease:'<%= paths.folder.release %>',
            tidyRelease:[
                '<%= paths.folder.release %>test',
                '<%= paths.folder.release %>css',
                '<%= paths.folder.release %>*.styl',
                '<%= paths.folder.release %>**/sass',
                '<%= paths.folder.release %>**/less',
                '<%= paths.folder.release %>**/*.coffee',
                '<%= paths.folder.release %>*.DS_Store'
            ]
        },
        /* HTML Tasks
        ---------------------------------------------- */
        inc:{
            index:{
                cwd: '<%= paths.folder.build %>',
                src: '<%= paths.source.html %>',
                dest: '<%= paths.folder.release %>'
            }
        },
        modified:{
            src: '<%= paths.source.html %>'
        },
        /* CSS Tasks
        ---------------------------------------------- */
        less:{
            project:{
                src: '<%= paths.source.project %>',
                dest: '<%= paths.output.project %>',
                options: lessOptions
            },
            bootstrap:{
                src: '<%= paths.source.bootstrap %>',
                dest: '<%= paths.output.bootstrap %>',
                options: lessOptions
            },
            bootstrapResponsive:{
                src: '<%= paths.source.bootstrapResponsive %>',
                dest: '<%= paths.output.bootstrapResponsive %>',
                options: lessOptions
            }
        },
        /* Preview Server
        ---------------------------------------------- */
        connect:{
            build:{
                options:{
                    base: '<%= paths.folder.build %>',
                    port: server.build,
                    keepalive:true
                }
            },
            release:{
                options:{
                    base: '<%= paths.folder.release %>',
                    port: server.release,
                    keepalive:true
                }
            }
        }
    };

    // Create the concat task by grouping based on naming conventions
    // config.concat = cerberus.grouper({
    //         src:config.data.paths.folder.commonBuild + 'js/**/*.*',
    //         dest:config.data.paths.folder.commonBuild + 'js/concat/',
    //         delimiter:'-'
    //     });

    // Load custom tasks
    grunt.loadTasks('tasks');

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register tasks
    grunt.registerTask('default', ['release']);

    grunt.registerTask('build', ['less']);
    grunt.registerTask('release', ['build', 'clean:prepareRelease', 'copy:release', 'clean:tidyRelease', 'inc']);

    // Kick-off Grunt
    grunt.initConfig(config);
};


