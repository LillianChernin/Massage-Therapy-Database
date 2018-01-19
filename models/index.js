const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mt-database');

module.exports.Disorder = require('./disorder');
module.exports.Comments = require('./comment');
module.exports.Technique = require('./technique');
module.exports.Muscle = require('./muscle');
module.exports.Bone = require('./bone');
module.exports.User = require('./user');
