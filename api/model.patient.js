const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Post = new Schema({
  status: {
    type: String
  },
  firstName: {
    type: String
  },
  secondName: {
    type: String
  },
  gender: {
    type: String
  },
  birthDate: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String
  }
},{
    collection: 'hospital-patients'
});

module.exports = mongoose.model('Post', Post);
