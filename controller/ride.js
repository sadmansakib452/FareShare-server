const User = require("../models/User");
const Ride = require("../models/Ride");
const error = require("../utils/error");
const mongoose = require("mongoose");

const searchRide = async (req, res, next) => {
  const {vehicle} = req.params
  console.log('Vehicle',vehicle)
  try {
    // Find the ongoing ride's driver ID from the Ride collection
    const ongoingRide = await Ride.findOne({ status: "ongoing" });
    const ongoingDriverId = ongoingRide ? ongoingRide.driverId : null;

    // Find the available drivers from the User collection, excluding the ongoing ride's driver
    const availableDrivers = await User.find({
      _id: { $ne: ongoingDriverId },
      roles: "DRIVER",
      'vehicle.type': vehicle
    });

    // Return the available drivers as a response
    res.json(availableDrivers);
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while searching for rides." });
  }
};

const createRide = async (req, res, next) => {
  try {
    const { userId, driverId, startLocation, endLocation } = req.body;
    console.log('My data',userId, driverId, startLocation, endLocation)
    let ride = await Ride.findOne({ driverId });

    if (ride) throw error("Ride already exist", 400);

    // Create a new ride record with the user and driver information
    const newRide = new Ride({
      userId,
      driverId,
      startLocation,
      endLocation,
      status: "requested",
    });

    // Save the new ride record to the database
    const savedRide = await newRide.save();

    res.status(200).json(savedRide);
  } catch (error) {
    // Handle error
    next(error);
  }
};

const deleteRide = async (req, res, next) => {
  try {
    const { rideId } = req.params;

    // Find the ride by rideId
    const ride = await Ride.findOne({
      _id: new mongoose.Types.ObjectId(rideId),
    });

    if (!ride) {
      return res.status(404).json({ error: "Ride not found." });
    }

    // Delete the ride
    await Ride.deleteOne({ _id: new mongoose.Types.ObjectId(rideId) });

    res.status(204).json({ message: "Ride deleted successfully." });
  } catch (error) {
    // Handle error
    next(error);
  }
};

module.exports = {
  searchRide,
  createRide,
  deleteRide,
};
