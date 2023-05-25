const router = require('express').Router()
const authRoutes = require('./auth')
const ride = require('./ride')
const driver = require('./driver')
// const userRoutes = require('./users')
const authenticate = require('../middleware/authenticate')


router.use('/api/v1/auth',authRoutes)
router.use('/api/v1/users/rides', authenticate, ride)
router.use('/api/v1/drivers',authenticate, driver)
// router.use('/api/v1/users',authenticate,userRoutes)
module.exports = router