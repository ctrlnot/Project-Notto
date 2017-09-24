const mongoose = require('mongoose'),
      moment = require('moment'),
      config = require('../config/database');

// Member schema
const MemberSchema = mongoose.Schema({
  member_name: {
    type: String,
    required: true
  },
  member_basic_deposit: {
    type: String,
    required: true
  },
  member_contact: {
    type: String
  },
  member_date_registered: {
    type: String,
    default: moment().format('YYYY/MM/DD')
  },
  member_active: {
    type: Boolean,
    default: true
  }
});

const Member = module.exports = mongoose.model('Member', MemberSchema);

module.exports.registerMember = function(newMember, callback) {
  newMember.save(callback);
}