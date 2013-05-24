module.exports = {

    grouper:function(data) {
        var grunt = require("grunt"),
            path = require("path"),
            sources = ["!**/concat/*", "!**/min/*"],
            filePaths,
            basePath,
            baseName,
            filePath,
            group,
            extension,
            uniques = {},
            result = {},
            output;

        if (typeof(data.src) == 'array') {
            sources.unshift.apply(sources, data.src);
            filePaths = grunt.file.expand(sources);
        } else {
            sources.unshift(data.src);
            filePaths = grunt.file.expand(sources);
        }

        filePaths.forEach(function(value, index) {
            baseName = path.basename(value);
            group = baseName
                .split(".")[0]
                .split(data.delimiter)[0];

            if (!uniques[group]) {
                extension = baseName.substr(baseName.lastIndexOf("."));
                uniques[group] = {
                    src:[value],
                    dest:(data.dest + group + extension)
                };
            } else {
                uniques[group].src.push(value);
            }

            // filePath = (cwd) ? value.replace(cwd, "") : value;
            // fileName = path.basename(value);
            // basePath = path.dirname(value) + "/";
        });

        // Drop single files
        for (var key in uniques) {
            if (uniques[key].src.length == 1) {
                delete uniques[key];
            } else {
                result[key] = uniques[key];
            }
        }

        return result;
    }

};