var User = require('../models/User');

module.exports = function(app, passport) {
    app.post('/api.v1/users', function(req, res) {
        User.findOne({'basic.email': req.body.email}, function(err,user) {
            if(err) {
                res.send(500, err);
                return false;
            }
            if(user) {
                res.send(409, {'msg': 'Unathorized email'});
                return false;
            }
            var newUser = new User({});
            newUser.basic.email = req.body.email;
            newUser.basic.password = newUser.generateHash(req.body.password);

            newUser.save(function(err, resNewUser) {
                if(err) {
                    return res.send(500, err);
                }
                res.send(resNewUser);
            });// end newUser.save
        });// end User.findOne
    });// end app.post
    app.get('/api/v1/users',
        passport.authenticate('basic', {session: false}),
        function(req, res) {
            res.json(req.user);
        }
    );// end app.get
}// end module.exports