var passport         = require('passport'),
    loginToApi       = require('./login_to_api'),
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, apiPath, host) {
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['basic_info', 'email'] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    }
  ));

  passport.use(new FacebookStrategy({
      clientID:     process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:  host + '/auth/facebook/callback' // node side
    }, function(accessToken, refreshToken, profile, done) {
      loginToApi(accessToken, refreshToken, profile, done, apiPath, 'facebook');
    }
  ));
};