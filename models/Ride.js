const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['requested', 'ongoing', 'completed', 'cancelled'],
    default: 'requested',
  },
  // Additional ride fields
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
