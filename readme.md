# djurl

Djurl is an attempt at providing [Django](http://djangoproject.com) [URL dispatching](http://docs.djangoproject.com/en/1.3/topics/http/urls/) for [node.js](http://nodejs.org).

## Key Features

* Simple action dispatching
* Familiar to Django users
* Supports Python regex named capture groups (e.g. `(?P<groupname>.*?)`)


## Usage

URL dispatching is basic:

    var djurl = require("djurl");
    
    /* indexAction and fooAction functions */
    
    /* Define patterns */
    var patterns = djurl.urlpatterns([
        ["^/$", indexAction, "index"],
        ["^/foo/(?P<action>\\w+)/$", fooAction],
    ]);

    http.createServer(function(req, res) {
        djurl.dispatch(patterns, req, res); /* url processing starts here */
    }).listen(8080);

`urlpatterns` accepts an array of pattern arrays with the following format:

* `path` - String containing path to compile to RegExp
* `action` - Function to dispatch on matching path
* `name` (Optional) - String containing named handle to url pattern

Actions should accept the following arguments:
    
* `request` - Node request object
* `response` - Node response handle
* `path` - Object containing path info
* `name` - String containing path name defined in `urlpatterns`
  
## N.B.

* Make sure Regex character classes are escaped properly: `\\w+` instead of `\w+`

## TODO

* Better 404 handling
* Robustness
* Performance
* Extend Node request object?

## LICENSE

The MIT License

Copyright © 2011 Chris Bennett <author@chrisrbennett.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

