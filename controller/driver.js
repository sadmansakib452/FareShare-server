const error = require("../utils/error");
const Ride = require("../models/Ride");
const handleAssignedRuide = async (req, res, next) => {
  try {
    const { driverId } = req.params;

    // Find the assigned ride for the driver with the provided driverId
    const assignedRide = await Ride.findOne({ driverId });

    if (!assignedRide) {
      throw error("No assigned ride found", 404);
    }

    res.json(assignedRide);
  } catch (error) {
    // Handle error
    next(error);
  }
};

const handleDecisionRide = async (req, res, next) => {
  try {
    const { rideId } = req.params;
    const { action } = req.params;

    // Find the assigned ride and check if it is in the "requested" status
    const assignedRide = await Ride.findOne({ _id: rideId });

    if (!assignedRide) {
      throw error("Ride not found or has already been accepted.", 404);
    }

    if (action === "accept") {
      // Update the ride status to "ongoing" when the driver accepts
      assignedRide.status = "ongoing";
      await assignedRide.save();

      res.json(assignedRide);
    } else if (action === "decline") {
      // Update the ride status to "cancelled" when the driver declines
      assignedRide.status = "cancelled";
      await assignedRide.save();

      res.json({ message: "Ride declined successfully.", assignedRide });
    } else if (action === "complete") {
      // Update the ride status to "completed" when the driver reach destination
      assignedRide.status = "completed";
      await assignedRide.save();

      res.json({ message: "Ride declined successfully.", assignedRide });
    } else {
      throw error("Invalid action specified", 400);
    }
  } catch (error) {
    // Handle error
    next(error);
  }
};

module.exports = {
  handleAssignedRuide,
  handleDecisionRide,
};
