var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Home Page */
router.get('/', ctrlHome.homePage);

/* Blog Pages */
router.get('/blog', ctrlBlog.blogList);
router.get('/blog/add', ctrlBlog.blogAdd);


module.exports = router;
