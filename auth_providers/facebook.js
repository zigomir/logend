var passport         = require('passport'),
    loginToApi       = require('./login_to_api'),
    FacebookStrategy = require('passport-facebook').Strategy,
    redirectUrl      = process.env.REDIRECT_URL;

module.exports = function(app, apiPath, host) {
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['basic_info', 'email'] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: redirectUrl }),
    function(req, res) {
      var user = req.user;
      res.redirect(redirectUrl + '?userToken=' + user.userToken + '&userId=' + user.userId);
    }
  );

  passport.use(new FacebookStrategy({
      clientID:     process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:  host + '/auth/facebook/callback' // node side
    }, function(accessToken, refreshToken, profile, done) {
      loginToApi(accessToken, refreshToken, profile, done, apiPath, 'facebook');
    }
  ));
};