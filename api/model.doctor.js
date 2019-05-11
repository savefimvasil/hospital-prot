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
  profession: {
    type: String
  },
  category: {
    type: String
  },
  password: {
    type: String
  }
},{
  collection: 'hospital-doctors'
});

module.exports = mongoose.model('Doctor', Post);
