var passport       = require('passport'),
    loginToApi     = require('./login_to_api'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    clientHost     = process.env.CLIENT_HOST;

module.exports = function(app, apiPath, host) {
  app.get('/auth/google', passport.authenticate('google',
    { scope: 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'}
  ));
  app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: clientHost,
      failureRedirect: clientHost
    }
  ));

  passport.use(new GoogleStrategy({
      clientID:     process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL:  host + '/auth/google/callback' // node side
    }, function(accessToken, refreshToken, profile, done) {
      loginToApi(accessToken, refreshToken, profile, done, apiPath, 'google');
    }
  ));
};