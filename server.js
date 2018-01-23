const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const findOrCreate = require('mongoose-findorcreate');
const db = require('./models');

const ENV                = require('./oauth');
const googleClientKey    = ENV.GOOGLE_CLIENT_ID;
const googleClientSecret = ENV.GOOGLE_CLIENT_SECRET;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const disorderRoutes = require('./routes/disorders');
const techniqueRoutes = require('./routes/techniques');
const kaRoutes = require('./routes/kinesiology-anatomy');
const apiRoutes = require('./routes/api');

mongoose.connect('mongodb://localhost/mt-database');
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: googleClientKey,
    clientSecret: googleClientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       db.User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use('/disorders', disorderRoutes);
app.use('/techniques', techniqueRoutes);
app.use('/kinesiology-anatomy', kaRoutes);
app.use('/api', apiRoutes);

app.get('/auth/google',
  passport.authenticate('google', { scope: 'email' }));

app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/',
    failureRedirect: '/' }));

app.get('/', (req, res) => {
  res.render('index', {
    documentTitle: "MT Database"
  })
});

app.get('/logout', () => {
  req.logout();
  res.redirect('/')
});

app.get('*', (req, res) => {
  res.render('four-zero-four', {
    documentTitle: "404 Error!"
  })
});

app.listen(3000, () => {
  console.log("I am listening");
});
