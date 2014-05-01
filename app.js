var express   = require('express'),
    httpProxy = require('http-proxy'),
    passport  = require('passport');

var proxyHost = process.env.API_HOST,
    proxyPath = process.env.API_PATH,
    apiPath   = proxyHost + proxyPath,
    app       = express(),
    apiProxy  = httpProxy.createProxyServer();

// serve static
app.configure(function() {
  app.use(express.compress());
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.session({ secret: process.env.SESSION_SECRET }));

  // saving post!
  // https://github.com/nodejitsu/node-http-proxy/issues/180#issuecomment-12244852
  // proxying and passport won't work together well without connect-restreamer!
  // problem was if I included apiProxy before passport.initialize it would do all proxying right,
  // but then passport (auth) won't work and the other way around -> proxy will stop working for POST
  // requests if it was defined after passport.initialize
  app.use(require('connect-restreamer')());

  // passport specific
  app.use(passport.initialize());
  app.use(passport.session());
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/token', function(req, res) {
    res.json(req.user || {});
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
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

  if (!process.env.CLIENT_HOST) {
    console.log('Stopping. You are missing CLIENT_HOST variable!');
    server.close();
  }
  if (!process.env.API_SECRET) {
    console.log('Stopping. You are missing API_SECRET variable!');
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
  if (!process.env.SESSION_SECRET) {
    console.log('Stopping. You are missing SESSION_SECRET variable!');
    server.close();
  }
});

app.all(proxyPath + '/*', function(req, res) {
  apiProxy.web(req, res, { target: proxyHost });
});