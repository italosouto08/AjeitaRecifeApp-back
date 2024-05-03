const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Complaint = new Schema({
  isAnonymous: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: function() {
        return !this.isAnonymous;
    }
  },
  cpf: {
    type: String,
    required: function() {
        return !this.isAnonymous;
    }
  },
  email: {
    type: String,
    required: function() {
        return !this.isAnonymous;
    }
  },
  phone: {
    type: String,
    required: function() {
        return !this.isAnonymous; 
    }
  },
  cep: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  landmark: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    data: Buffer, 
    contentType: String
  }
},{
    collection: 'denuncia'
});

module.exports = mongoose.model('Complaint', Complaint);
