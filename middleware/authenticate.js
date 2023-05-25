const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
    

  try{

    let token = req.headers.authorization
    console.log(token)
  if(!token){
    return res.status(401).json({message: 'Unauthorized'})
  }

    token = token.split(' ')[1]
    const decoded = jwt.verify(token, 'secret-key')

    const user = await User.findOne({_id: decoded._id})

    if(!user){
      return res.status(401).json({message: 'Unauthorized'})
    }

   req.user = user
   next()

  }catch(e){
    console.log(e)
    return res.status(400).json({message: 'Invalid token'})

  }
}

module.exports = authenticate