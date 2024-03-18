var request = require('request');
var apiOptions = {
    server: "http://localhost"
};

/* GET 'home' page */
module.exports.homepage = function(req, res){
    res.render('home', { title: "Shane del Villar's Blog Site"});
};

var renderBloglist = function(req, res, responseBody) {
    res.render('blogList', { title: 'Blog List',
        blogs: responseBody
    });
}

/* GET 'blogList' page */
module.exports.bloglist = function(req, res){
    var requestOptions, path;
    path = "/api/blogs";
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderBloglist(req, res, body);
        }
    );
};

/* GET 'blogAdd' page */
module.exports.addBlogs = function(req, res) {
    res.render('blogAdd', { title: 'Blog Add' });
}

module.exports.blogadd = function(req, res){
    var requestOptions, path, postData;
    path = "/api/blogs";
    postData = {
        blogTitle: req.body.blogTitle,
        blogEntry: req.body.blogEntry
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postData
    };
    request(
        requestOptions,
        function(err, response, body) {
            if(response.statusCode == 201){
                res.redirect('/blogList');
            }
        }
    );
};

var renderBlogedit = function(req, res, responseBody){
    res.render('blogEdit', { title: 'Blog Edit', blog: responseBody, blogTitle: responseBody.blogTitle, blogEntry: responseBody.blogEntry});
};

/* GET 'blogEdit' page */
module.exports.blogedit = function(req, res){
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url: apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderBlogedit(req, res, body);
        }
    );
};

module.exports.editBlog = function (req, res) {
    var requestOptions, path, postdata;
    var id = req.params.blogid;
    path = '/api/blogs/' + id;

    postdata = {
        blogTitle: req.body.blogTitle,
        blogEntry: req.body.blogEntry
    };

    requestOptions = {
        url: apiOptions.server + path,
        method: "PUT",
        json: postdata
    };

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/blogList');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports.deleteBlog = function (req, res) {
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderBlogDeletion(req, res, body);
        }
    );
};

var renderBlogDeletion = function (req, res, responseBody) {
    res.render('blogDeletion', { title: "Blog Deletion", blog: responseBody });
};

module.exports.blogdeletion = function (req, res) {
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "DELETE",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/blogList');
            } else {
                _handleError(req, res, response.statusCode);
            }
        }
    );
};

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
	title = "404, page not found";
	content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
	title = "500, internal server error";
	content = "How embarrassing. There's a problem with our server.";
    } else {
	title = status + ", something's gone wrong";
	content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
	title : title,
	content : content
    });
};
