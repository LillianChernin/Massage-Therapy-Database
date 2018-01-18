const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const techniqueSchema = new Schema ({
  shortDescription: String,
  detailedDescription: String,
  comments: [Comment.Schema],
  approved: {type: Boolean, default: false},
  author: {type: String, default: "db_owner"}
})

const Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;
module.exports.Schema = techniqueSchema;
