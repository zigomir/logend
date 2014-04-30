var request = require('request');
var winston = require('winston');

winston.add(winston.transports.File, { filename: 'login_to_api.log' });

module.exports = function(accessToken, refreshToken, profile, done, apiPath, provider) {
  try {
    var email = profile.emails[0].value;
    var name  = profile.displayName;

    request.post({
        url: apiPath + '/login',
        json: true,
        headers: { 'api-secret': process.env.API_SECRET },
        form: { email: email, name: name, provider: provider }},
      function (e, r, body) {
        if (e) {
          winston.error('POST to API /login went wrong!', { errorMessage: e });
        }

        // lets set user to session
        var user = {
          userToken: body.user.token,
          userId: body.user.id
        };
        done(null, user);
      }
    );

  } catch (e) {
    winston.error('Something wen wrong with profile data!', { errorMessage: e });
  }
};