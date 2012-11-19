/*
Valid include directives:

 <!-- #include "inc/hello.inc" -->
 <!-- #include 'inc/hello.inc' -->
 <!-- #include 'inc/hello.inc' -->

 <!-- #Include virtual='inc/hello.inc' -->
 <!-- #Include virtual="inc/hello.inc" -->

 <?php include("inc/hello.inc"); ?>
 <?php include('inc/hello.inc'); ?>
 <?php include "inc/hello.inc"; ?>
 <?php include 'inc/hello.inc'; ?>

 */
module.exports = function(grunt) {

    grunt.registerMultiTask("inc", "Simple includes for html", function(){
        var path = require("path"),
            incHTML = /(<!--\s#include\s+['"](.*)['"]\s-->)/g,
            incNET = /(<!--\s+#Include\svirtual=['"](.*)['"]\s+-->)/g,
            incPHP = /(<\?php\s+include\(?\s?['"](.*)['"]\s?\)?;\s+\?>)/g,
            root = this.data.root,
            destPath = this.data.dest,
            filePaths = grunt.file.expandFiles(this.data.src),
            basePath,
            filePath,
            source,
            output;


        if (getFileType(this.data.dest) == "dir") {
            filePaths.forEach(function(value, index){
                source = grunt.file.read(value);
                output = source;
                filePath = (root) ? value.replace(root, "") : value;
                fileName = path.basename(value);
                basePath = path.dirname(value) + "/";

                if (incHTML.test(source)) output = replaceIncludes(incHTML, output, basePath);
                if (incNET.test(source)) output = replaceIncludes(incNET, output, basePath);
                if (incPHP.test(source)) output = replaceIncludes(incPHP, output, basePath);
                if (source !== output) grunt.file.write(destPath + filePath, output);
            });
        } else {
            grunt.log.error("Destination must be a directory!\nDid you miss a trailing '/'?");
        }


    });
    function replaceIncludes(reg, source, base){
        reg.lastIndex = 0;
        var output = source,
            incMatches;
        while ((incMatches = reg.exec(source)) !== null) {
            output = output.replace(incMatches[1], (grunt.file.read(base + incMatches[2])));
        }
        return output;
    }
    function getBasePath(path){
        return path.substring(0,(path.lastIndexOf("/") +1));
    }

    function getFileType(path){
        var index = path.lastIndexOf("/");
        return ((path.length - 1) === index) ? "dir" : "file";
    }
}