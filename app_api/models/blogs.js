var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({
    blogTitle: {type: String, required: true},
    blogEntry: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Blog', blogSchema);