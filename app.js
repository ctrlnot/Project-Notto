const express = require('express'),
      logger = require('morgan'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      stylus = require('stylus'),
      nib = require('nib');

const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On database connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On database error connection
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const port = 3003;
const app = express();
const users = require('./routes/users');

// Cors MW
app.use(cors());

// Static folder
// app.set('views', __dirname + '/views');
// app.set('view engine', 'pug');
// app.use(logger('dev'));
// app.use(stylus.middleware({src: __dirname + '/public', compile: compile}));
app.use(express.static(path.join(__dirname, 'public')));

// Compress stylus
// function compile(str, path) {
//   return stylus(str).set('filename', path).use(nib());
// }

// Body parser MW
app.use(bodyParser.json());

// Passport MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Index route
app.use('/', users);

// Start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});