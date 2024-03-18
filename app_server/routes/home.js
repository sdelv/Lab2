var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* homepage */
router.get('/', ctrlBlog.homepage);

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
