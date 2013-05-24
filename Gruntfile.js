module.exports = function (grunt) {

    var data = require('./package.json'),
        cerberus = require('./cerberus'),
        lessOptions = {
            compress:false
        };

    var config = {
        data:grunt.file.readJSON('package.json'),
        /*
        File Operation Tasks
         */
        watch:{
            html:{
                files:data.paths.source.html,
                tasks:'inc'
            },
            less:{
                files:data.paths.source.less,
                tasks:'recess'
            }
        },
        copy:{
            release:{
                files:[
                    {
                        cwd:'<%= data.paths.folder.build %>',
                        src:['**/*'],
                        dest:'<%= data.paths.folder.release %>',
                        expand:true
                    }
                ]
            }
        },
        clean:{
            release:data.paths.excludes,
            prepareRelease:'<%= data.paths.folder.release %>',
            prepareTag:'<%= data.paths.output.tag %>'
        },
        compress:{
            tag:{
                options: {
                    archive:'<%= data.paths.output.tag %>'
                },
                files:{
                    cwd:'<%= data.paths.folder.release %>',
                    src:'**/*',
                    dest:'<%= data.paths.folder.tag %>'
                }
            }
        },
        /*
        HTML Tasks
         */
        inc:{
            index:{
                cwd:data.paths.folder.build,
                src:data.paths.source.html,
                dest:data.paths.folder.release
            }
        },
        modified:{
            src:data.paths.source.index
        },
        /*
         CSS Tasks
         */
        less:{
            project:{
                src:data.paths.source.project,
                dest:data.paths.output.project,
                options:lessOptions
            },
            bootstrap:{
                src:data.paths.source.bootstrap,
                dest:data.paths.output.bootstrap,
                options:lessOptions
            },
            bootstrapResponsive:{
                src:data.paths.source.bootstrapResponsive,
                dest:data.paths.output.bootstrapResponsive,
                options:lessOptions
            }
        },
        /*
        JS Tasks
         */
        // lint and jshint objects work in conjunction in the 'lint' task
        lint:{
            all:data.paths.source.js
        },
        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                undef:true,
                boss:true,
                eqnull:true,
                node:true,
                es5:true
            },
            globals:{
                "console":true,
                "_":true,
                "jQuery":true,
                "$":true
            }
        }
    };

    // Create the concat task by grouping based on naming conventions
    config.concat = cerberus.grouper({
            src:config.data.paths.folder.build + "js/**/*.*",
            dest:config.data.paths.folder.build + "js/concat/",
            delimiter:"-"
        });

    // Load custom tasks
    grunt.loadTasks('tasks');

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Load register tasks
    grunt.registerTask('default', ['lint', 'release']);

    grunt.registerTask('build', ['less', 'concat']);
    grunt.registerTask('release', ['build', 'modified', 'clean:prepareRelease', 'copy:release', 'clean:release', 'inc']);
    grunt.registerTask('tag', ['clean:prepareTag', 'compress:tag']);

    // Kick-off Grunt
    grunt.initConfig(config);
};

