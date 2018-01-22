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

const disorderRoutes = require('./routes/disorders');
const techniqueRoutes = require('./routes/techniques');
const kaRoutes = require('./routes/kinesiology-anatomy');
const apiRoutes = require('./routes/api');

app.use(cookieParser());
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

app.get('/', (req, res) => {
  res.render('index', {
    documentTitle: "MT Database"
  })
});

app.get('*', (req, res) => {
  res.render('four-zero-four', {
    documentTitle: "404 Error!"
  })
});

app.listen(3000, () => {
  console.log("I am listening");
});
