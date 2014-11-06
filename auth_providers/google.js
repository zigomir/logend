var passport       = require('passport'),
    loginToApi     = require('./login_to_api'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    redirectUrl    = process.env.REDIRECT_URL;

module.exports = function(app, apiPath, host) {
  app.get('/auth/google', passport.authenticate('google',
    { scope: 'https://www.googleapis.com/auth/userinfo.email'}
  ));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: redirectUrl }),
    function(req, res) {
      var user = req.user;
      res.redirect(redirectUrl + '?userToken=' + user.userToken + '&userId=' + user.userId);
    }
  );

  passport.use(new GoogleStrategy({
      clientID:     process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL:  host + '/auth/google/callback' // node side
    }, function(accessToken, refreshToken, profile, done) {
      loginToApi(accessToken, refreshToken, profile, done, apiPath, 'google');
    }
  ));
};
