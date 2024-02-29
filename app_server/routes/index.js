var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* Home Page */
router.get('/', ctrlHome.homePage);

/* Blog Pages */

/* Blog List */
router.get('/bloglist', ctrlBlog.bloglist);

/* Blog Add */
router.get('/blogadd', ctrlBlog.addBlogs);
router.post('/blogadd', ctrlBlog.blogadd);

/* Blog Edit */
router.get('/blogedit/:blogid', ctrlBlog.blogedit);
router.post('/blogedit/:blogid', ctrlBlog.editBlog);

/* Blog Deletion */
router.get('/blogdeletion/:blogid', ctrlBlog.deleteBlog);
router.post('/blogdeletion/:blogid', ctrlBlog.blogdeletion);

module.exports = router;
