var User = require('../models/User');

module.exports = function(app, passport) {
    app.post('/api.v1/users', function(req, res) {
        User.findOne({'basic.email': req.body.email}, function(err,user) {
            if(err) {
                req.send(500, err);
                return false;
            }
            if(user) {
                res.send(409, {'msg': 'Unathorized email'});
                return false;
            }

        });
    });
}