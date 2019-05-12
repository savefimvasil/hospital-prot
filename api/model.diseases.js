const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Post = new Schema({
  userId: {
    type: String
  },
  diagnosis: {
    type: String
  },
  description: {
    type: String
  },
  treatment: {
    type: String
  },
  date: {
    type: String
  }
},{
  collection: 'hospital-diseases'
});

module.exports = mongoose.model('Diseases', Post);
