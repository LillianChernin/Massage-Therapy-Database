var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  google: {
    id: String,
    access_token: String,
    email: String,
    accessLevel: String
  }
});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);
