const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const Event = require('../models/Event');

// @route   GET  api/events
// @desc    Get my events
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST  api/events
// @desc    Add new event
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('eventName', 'Event name is required')
        .not()
        .isEmpty(),
      check('startTime', 'Please include a start time')
        .not()
        .isEmpty(),
      check('description', 'Please include a description')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventName, startTime, endTime, description } = req.body;
    try {
      const newEvent = new Event({
        eventName,
        startTime,
        endTime,
        description,
        user: req.user.id
      });
      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT  api/events/:id
// @desc    Update Event
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { eventName, startTime, endTime, description } = req.body;

  // build contact object
  const eventFields = {};
  if (eventName) eventFields.eventName = eventName;
  if (startTime) eventFields.startTime = startTime;
  if (endTime) eventFields.endTime = endTime;
  if (description) eventFields.description = description;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });
    //make sure user owns contact

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE  api/events/:id
// @desc    Delete an event
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });
    //make sure user owns contact

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Event.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Event Deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
