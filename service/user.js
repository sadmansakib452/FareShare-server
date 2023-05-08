const User = require("../models/User");
const error = require('../utils/error');
const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }

  return User.findOne({ [key]: value });
};

const createNewUser = (data) => {
   const {name,email,password,roles,phone,address,nid} = data
  const user = new User({
    name,
    email,
    password,
    phone,
    address,
    nid,
    roles: roles ? roles : "USER",
    
  });
  if(data.roles === 'DRIVER'){
    user.vehicle = {
        type: data.type,
        model: data.model,
        licensePlate: data.licensePlate,
      }; 
  }
  return user.save();
};

const updateUser = async (id, data) =>{

  const user = await findUserByProperty('email', data.email)
  if(user){
    throw error('Email already in use',404)
  }

  return User.findByIdAndUpdate(id,{...data}, {new: true})
}

module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
  updateUser,
};
