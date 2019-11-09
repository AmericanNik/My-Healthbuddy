const express = require('express');
const router = express.Router();

// @route   GET  api/invite
// @desc    Get an invite
// @access  Private
router.get('/', (req, res) => {
  res.send('Get an invite');
});

// @route   POST  api/invite
// @desc    Post an Invite
// @access  Private
router.post('/', (req, res) => {
  res.send('Send an invite');
});

module.exports = router;
