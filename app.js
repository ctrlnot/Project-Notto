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
const members = require('./routes/members');

// Cors MW
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser MW
app.use(bodyParser.json());

// Passport MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Index route
app.use('/users', users);

// Members route
app.use('/members', members);

// Other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});