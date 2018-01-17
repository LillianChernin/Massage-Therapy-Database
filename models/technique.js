const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techniqueSchema = new Schema ({
  description: String,
  comments: Array
})

const Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;
module.exports.Schema = techniqueSchema;
