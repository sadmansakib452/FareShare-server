const router = require('express').Router()
const {searchRide, createRide,deleteRide} = require('../controller/ride')

router.get("/search/:vehicle",searchRide);
router.post("/select-ride",createRide);
router.delete('/:rideId',deleteRide)

module.exports = router