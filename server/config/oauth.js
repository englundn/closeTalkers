const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const clientID = process.env.GOOGLE_ID || require('./config').client;
const clientSecret = process.env.GOOGLE_SECRET || require('./config').secret;

const URL = process.env.ROOT || 'http://localhost:3000';

module.exports = (app) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL: `${URL}/auth/google/callback`,
    passReqToCallback: true,
  }, (request, accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  app.use(cookieParser());
  app.use(session({ secret: 'cookie_secret', resave: true, saveUninitialized: true }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login',
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
    }), (req, res) => res.redirect('/?')
  );

  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      req.logout();
      res.redirect('/');
    });
  });
};
