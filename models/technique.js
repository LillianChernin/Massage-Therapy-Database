const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techniqueSchema = new Schema ({
  description: String,
  comments: Array,
  approved: {type: Boolean, default: false},
  author: {type: String, default: "db_owner"}
})

const Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;
module.exports.Schema = techniqueSchema;
