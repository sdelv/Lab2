/* GET 'Blog List' page */
module.exports.blogList = function(req, res){
    res.render('blog-list', { title: 'Blog List',
        blogs:[            
            { title: 'Hello', text: 'The first' },
            { title: 'Hi', text: 'The second' },
            { title: 'Greetings', text: 'The third' }
        ]
    });
};

/* GET 'Add Blog' page */
module.exports.blogAdd = function(req, res){
  res.render('blog-add', { title: 'Blog Add' });
};

/* GET 'blogEdit' page */
module.exports.blogEdit = function(req, res){  res.render('blog-edit', { title: 'Blog Edit' });
};

/* GET 'blogDeletion' page */
module.exports.blogDelete = function(req, res){
    res.render('blog-delete', { title: 'Blog Deletion' });
};
