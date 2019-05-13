const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  id: {
    type: String
  },
  x: {
    type: String
  },
  y: {
    type: String
  },
  k: {
    type: String
  },
  alfa: {
    type: String
  }
},{
  collection: 'hospital-crypto'
});

module.exports = mongoose.model('Crypto', Post);
