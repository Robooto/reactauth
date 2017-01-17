const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // verify the username and password, call done with the user
    // if it is the correct username call done
    // else call done ith false

    User.findOne({ email: email})
        .catch((err) => { return done(err, false); })
        .then((user) => {
            if(!user) {
                return done(null, false);
            }

            // compare passwords - is password = user.password
            console.log(user);
            user.comparePassword(password, function(err, isMatch) {
                if (err) { return done(err) ;}
                if (!isMatch) { return done(err, false);}

                return done(null, user);
            });
        });
});

// setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // see if the user id in the payload exists in our database
    // if it does, call 'done' with that user
    // otherwise call done without a user object
    User.findById(payload.sub)
        .catch((err) => { return done(err, false); })
        .then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);