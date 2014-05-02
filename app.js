var express   = require('express'),
    passport  = require('passport'),
    apiPath   = process.env.API_HOST + process.env.API_PATH,
    app       = express();

app.configure(function() {
  app.use(express.compress());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(passport.initialize());
  app.use(passport.session());
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var env  = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = 4000;
var host = process.env.HOST || 'http://localhost:' + port;

require('./auth_providers/facebook')(app, apiPath, host);
require('./auth_providers/google')(app, apiPath, host);

var server = app.listen(port, function() {
  console.log('HTTP server started on http://localhost:' + port + ' in ' + env + ' environment');
  console.log('Press Ctrl+C to stop');

  if (process.env.API_HOST && process.env.API_PATH) {
    console.log('Will proxy all requests on path ' + process.env.API_PATH + ' to ' + process.env.API_HOST + process.env.API_PATH);
  } else {
    console.log('Stopping. You are missing API_HOST or API_PATH variable!');
    server.close();
  }

  if (!process.env.REDIRECT_URL) {
    console.log('Stopping. You are missing REDIRECT_URL variable!');
    server.close();
  }
  if (!process.env.FACEBOOK_APP_ID) {
    console.log('Stopping. You are missing FACEBOOK_APP_ID variable!');
    server.close();
  }
  if (!process.env.FACEBOOK_APP_SECRET) {
    console.log('Stopping. You are missing FACEBOOK_APP_SECRET variable!');
    server.close();
  }
  if (!process.env.GOOGLE_APP_ID) {
    console.log('Stopping. You are missing GOOGLE_APP_ID variable!');
    server.close();
  }
  if (!process.env.GOOGLE_APP_SECRET) {
    console.log('Stopping. You are missing GOOGLE_APP_SECRET variable!');
    server.close();
  }
});