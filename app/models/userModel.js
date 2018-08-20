'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: String,
    default: ""
  },
  userName:{
    type: String,
    default: " "   
  },
  country:{
    type:String,
    default:" "
  },
  userVerified:{
    type: Boolean,
    default: false
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  createdOn :{
    type:Date,
    default:""
  }

})


mongoose.model('User', userSchema);