var mongoose = require( 'mongoose' );

var messageSchema = new mongoose.Schema({
    messageEntry: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    },
    messageAuthor: {type: String, required: true},
    authorEmail: {type: String, required: true}
});

mongoose.model('Message', messageSchema);' );
