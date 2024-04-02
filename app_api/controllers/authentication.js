var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required."
        });
        return;
    }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save()
        .then(() => {
            return user.generateJwt();
        })
        .then(token => {
            sendJSONresponse(res, 200, { "token": token });
        })
        .catch(err => {
            sendJSONresponse(res, 404, err);
        });
};


module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required."
        });
        return;
    }

    passport.authenticate('local', function(err, user, info) {
        var token;

        if(err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt()
              .then(token => {
                sendJSONresponse(res, 200, {
                  "token": token
                });
              })
              .catch(err => {
                sendJSONresponse(res, 500, err);
              });
          } else {
            sendJSONresponse(res, 401, info);
          }
        })(req, res);
};