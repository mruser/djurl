/* djurl - an attempt to make django routes work with node.js
 * Copyright © 2011 by Chris Bennett <author@chrisrbennett.com>
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

var url = require("url");

/* NamedRegex - strips Pythonic named capture groups and saves for exec return */
/** var test = "/foo/(?P<bar>\w+)/"; */
function NamedRegex(pattern) {
    this.pattern = pattern;
    var groups = [];
    var capturegroup = /\(\?P<(\w+)>(.*?)\)/g;
    
    this.pattern = this.pattern.replace(capturegroup, function (str, group_name, group_pattern) {
        groups.push(group_name);
        return "(" + group_pattern + ")";
    });
    this.groups = groups;
    this.pattern = RegExp(this.pattern);
}

NamedRegex.prototype.test = function(str) {
    return this.pattern.test(str);
};

NamedRegex.prototype.exec = function(str) {
    var exec_array;
    var match_object = {};
    var group_idx = 0;
    exec_array = this.pattern.exec(str);
    if (exec_array == null) return null;
    for (var name in this.groups) {
        match_object[this.groups[name]] = exec_array[++group_idx];
    }
    return match_object;
};

function urlpatterns(urls) {
    var paths = [];
    var actions = [];
    var names = [];
    for (var i in urls) {
        paths.push(new NamedRegex(urls[i][0]));
        actions.push(urls[i][1]);
        if (urls[i].length > 2) {
            names.push(urls[i][2]);
        } else { 
            names.push("");
        }
    }

    return {paths: paths, actions: actions, names: names};
}
exports.urlpatterns = urlpatterns;

function dispatch(patterns, req, res) {
    var path = url.parse(req.url).pathname;
    for (var i in patterns.paths) {
        if (patterns.paths[i].test(path)) {
            patterns.actions[i](req, res, patterns.paths[i].exec(path), patterns.names[i]);
            return;
        }
    }
    /* 404 */
    var body404 = "Path not found";
    res.writeHead(404, {"Content-Length": body404.length, "Content-Type": "text/plain"});
    res.end(body404);
}
exports.dispatch = dispatch;

