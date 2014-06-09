var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
    passport.use('basic', new BasicStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({'basic.email': email}, function(err, user) {
            if(err) { return done(err); }
            if(!user) { return done(null, false); }
            if(!user.validPasword(password)) { return done(null, false); }
            return done(null, user);
        });
    }));
};