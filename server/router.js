const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});


const routers = (app) => {
    app.get('/', requireAuth, function(req, res) {
        res.send({message: 'Super secret password is N O L A N.'});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
};

module.exports = routers;