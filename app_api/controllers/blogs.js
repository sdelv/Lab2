var mongoose = require('mongoose');
var request = require('request');
var Blo = mongoose.model('Blog');

module.exports.listAllBlogs = function (req, res) {
    Blo.find()
        .exec()
        .then(results => {
            if (!results || results.length === 0) {
                sendJsonResponse(res, 404, {
                    "message": "No blogs found"
                });
            } else {
                console.log(results);
                sendJsonResponse(res, 200, buildBlogList(req, res, results));
            }
        })
        .catch(err => {
            console.log(err);
            sendJsonResponse(res, 500, err);
        });
};

module.exports.getSingleBlog = function (req, res) {
    Blo
        .findById(req.params.blogid)
        .exec()
        .then(blog => {
            sendJsonResponse(res, 200, blog);
        })
        .catch(err => {
            console.error(err);
            sendJsonResponse(res, 500, { "error": "Internal Server Error" });
        });
};

module.exports.createNewBlog = function (req, res) {
    console.log(req.body);
    Blo
        .create({
            blogTitle: req.body.blogTitle,
            blogEntry: req.body.blogEntry
        })
        .then(blog => {
            console.log(blog);
            sendJsonResponse(res, 201, blog);
        })
        .catch(err => {
            console.log(err);
            sendJsonResponse(res, 400, err);
        });
};


module.exports.updateSingleBlog = async function (req, res) {
    try {
        console.log("Updating a blog entry with id of " + req.params.blogid);
        console.log(req.body);

        const blog = await Blo.findByIdAndUpdate(
            req.params.blogid,
            { $set: { "blogTitle": req.body.blogTitle, "blogEntry": req.body.blogEntry } },
            { new: true }
        );

        if (!blog) {
            sendJsonResponse(res, 404, { message: "Blog not found" });
        }
        sendJsonResponse(res, 201, blog);
    } catch (err) {
        sendJsonResponse(res, 400, err);
    }
};


module.exports.deleteSingleBlog = function (req, res) {
    Blo
        .findByIdAndDelete(req.params.blogid)
        .then(blog => {
            if (!blog) {
                sendJsonResponse(res, 404, { error: "Blog not found" });
            } else {
                sendJsonResponse(res, 204, null);
            }
        })
        .catch(err => {
            sendJsonResponse(res, 500, err);
        });
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var buildBlogList = function (req, res, results) {
    var blogs = [];
    results.forEach(function (obj) {
        blogs.push({
            blogTitle: obj.blogTitle,
            blogEntry: obj.blogEntry,
            createdOn: obj.createdOn,
            _id: obj._id
        });
    });
    return blogs;
};
