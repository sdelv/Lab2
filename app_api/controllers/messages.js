var mongoose = require('mongoose');
var request = require('request');
var message = mongoose.model('Message');


module.exports.listAllMessages = function (req, res) {
    message.find()
        .exec()
        .then(results => {
            if (!results || results.length === 0) {
                sendJsonResponse(res, 404, {
                    "message": "Start a Conversation!"
                });
            } else {
                console.log(results);
                sendJsonResponse(res, 200, buildMessageList(req, res, results));
            }
        })
        .catch(err => {
            console.log(err);
            sendJsonResponse(res, 500, err);
        });
};

module.exports.createNewMessage = function (req, res) {
    console.log(req.body);
    message
        .create({
            messageEntry: req.body.MessageEntry,
            messageAuthor: req.body.messageAuthor,
            authorEmail: req.body.authorEmail
        })
        .then(message => {
            console.log(message);
            sendJsonResponse(res, 201, blog);
        })
        .catch(err => {
            console.log(err);
            sendJsonResponse(res, 400, err);
        });
};

var buildMessageList = function (req, res, results) {
    var messages = [];
    results.forEach(function (obj) {
        messages.push({
            messageEntry: obj.messageEntry,
            createdOn: obj.createdOn,
            messageAuthor: obj.messageAuthor,
            authorEmail: obj.authorEmail,
            _id: obj._id
        });
    });
    return messages;
};
