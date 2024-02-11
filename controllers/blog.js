/* GET 'Blog List' page */
module.exports.blogList = function(req, res){
  res.render('blog-list', { title: 'Blog List' });
};

/* GET 'Add Blog' page */
module.exports.blogAdd = function(req, res){
  res.render('blog-add', { title: 'Blog Add' });
};
