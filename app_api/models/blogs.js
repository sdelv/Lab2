var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({
    blogTitle: {type: String, required: true},
    blogEntry: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    },
    blogAuthor: {type: String, required: true},
    authorEmail: {type: String, required: true}
});

mongoose.model('Blog', blogSchema);