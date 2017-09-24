const express = require('express'),
      router = express.Router(),
      moment = require('moment');

const Member = require('../models/members'),
      config = require('../config/database');

// Register a member
router.post('/register', (req, res, next) => {
  let newMember = new Member({
    member_name: req.body.name,
    member_basic_deposit: req.body.basicDeposit,
    member_contact: req.body.contact
  });

  Member.registerMember(newMember, (err, member) => {
    if(err) {
      res.json({success: false, msg: "Member adding went wrong please try again..."});
    } else {
      res.json({success: true, msg: "Member added..."});
    }
  });
});

module.exports = router;