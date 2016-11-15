const passport = require('passport');
const config = require('./config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = (app) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(new GoogleStrategy({
    clientID: config.client,
    clientSecret: config.secret,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
  }, (request, accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  app.use(cookieParser());
  app.use(session({ secret: 'cookie_secret' }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login',
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
    }), (req, res) => res.redirect('/')
  );
};
