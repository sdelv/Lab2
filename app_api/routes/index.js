var express = require('express');
var router = express.Router();

var ctrlBlogs = require('../controllers/blogs')

router.get('/blogs', ctrlBlogs.listAllBlogs);
router.post('/blogs', ctrlBlogs.createNewBlog);
router.get('/blogs/:blogid', ctrlBlogs.getSingleBlog);
router.put('/blogs/:blogid', ctrlBlogs.updateSingleBlog);
router.delete('/blogs/:blogid', ctrlBlogs.deleteSingleBlog);

module.exports = router;
