const router = require('express').Router()
const {handleAssignedRuide,handleDecisionRide} = require('../controller/driver')
const {deleteRide} = require('../controller/ride')
router.get("/rides/assigned/:driverId",handleAssignedRuide);
router.get('/rides/:rideId/:action',handleDecisionRide)
router.delete('/rides/:rideId',deleteRide)

module.exports = router