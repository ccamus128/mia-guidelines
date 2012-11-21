module.exports = function (grunt) {

    var data = require("./package.json"),
        recessOptions = {
            compress:false, // Compress your compiled code using LESS
            noIDs:true, // Doesn't complain about using IDs in your stylesheets
            prefixWhitespace:true, // Adds whitespace prefix to line up vender prefixed properties
            compile:true                    // Compiles CSS or LESS. Fixes white space and sort order.
            /*
             noJSPrefix:true,                // Doesn't complain about styling .js- prefixed classnames
             noOverqualifying:true,          // Doesn't complain about overqualified selectors (ie:div#foo.bar)
             noUnderscores:true,             // Doesn't complain about using underscores in your class names
             noUniversalSelectors:true,      // Doesn't complain about using the universal * selector

             strictPropertyOrder:true,       // Complains if not strict property order
             stripColors:false,              // Strip colors from the Terminal output
             zeroUnits:true,                 // Doesn't complain if you add units to values of 0
             */
        };

    // Project configuration.
    grunt.initConfig({
        data:"<json:package.json>",
        /*
        File Operation Tasks
         */
        watch:{
            html:{
                files:data.paths.source.html,
                tasks:"inc"
            },
            less:{
                files:data.paths.source.less,
                tasks:"recess"
            }
        },
        copy:{
            release:{
                files:{
                    "<%= data.paths.folder.release %>":"<%= data.paths.folder.build %>/**"
                }
            }
        },
        clean:{
            release:data.paths.excludes,
            prepareRelease:"<%= data.paths.folder.release %>",
            prepareTag:"<%= data.paths.folder.tag %>"
        },
        compress:{
            tag:{
                files:{
                    "<%= data.paths.output.tag %>":"<%= data.paths.folder.release %>/**"
                }
            }
        },
        /*
        HTML Tasks
         */
        inc:{
            index:{
                src:data.paths.source.html,
                dest:data.paths.folder.release,
                root:data.paths.folder.build
            }
        },
        modified:{
            src:data.paths.source.index
        },
        /*
         CSS Tasks
         */
        recess:{
            project:{
                src:data.paths.source.project,
                dest:data.paths.output.project,
                options:recessOptions
            },
            bootstrap:{
                src:data.paths.source.bootstrap,
                dest:data.paths.output.bootstrap,
                options:recessOptions
            },
            bootstrapResponsive:{
                src:data.paths.source.bootstrapResponsive,
                dest:data.paths.output.bootstrapResponsive,
                options:recessOptions
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
    });
    grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-recess");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-compress");

    grunt.registerTask("default", "lint release");

    grunt.registerTask("build", "recess");
    grunt.registerTask("release", "build modified clean:prepareRelease copy:release clean:release inc");
    grunt.registerTask("tag", "clean:prepareTag compress:tag");
};

