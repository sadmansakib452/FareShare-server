const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const driverValidation = ({roles, vehicle}) => {
//   if (roles === "USER" || roles === "ADMIN") {
//     return false;
//   } else {
//     // if (
//     //   vehicle.type === undefined &&
//     //   vehicle.model === undefined &&
//     //   vehicle.licensePlate === undefined
//     // ) {
//     //   return true;
//     // } else {
//     //   return false;
//     // }
//   }
// }

// Define the User schema
const userSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (prop) => `Invalid email: ${prop.value}`,
    },
  },
  password: {
    type: String,
    minlength: [6, "password is too short"],
    required: true,
  },

  roles: {
    type: String,
    enum: ["USER", "DRIVER", "ADMIN"],
    required: true,
    default: "USER",
    required: true,
  },
  vehicle: {
    type: { type: String, enum: ["CAR", "SUV", "MOTORCYCLE"] },
    model: { type: String },
    licensePlate: { type: String },
  },
  address:{
    type: String,
    maxlength: [30, "Address is too long"],
    required: [true,'Address is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  nid:{
    type: String,
    required: [
      function() { return (this.roles === 'DRIVER') != false ; },
      'nid is required'
    ],
   
    
  },
  createdAt: { type: Date, default: Date.now },
});

// Define a pre-save hook to ensure required fields are present for drivers
userSchema.pre("save", function (next) {
  console.log(this);
  if (
    this.roles === "DRIVER" &&
    (!this.vehicle ||
      !this.vehicle.type ||
      !this.vehicle.model ||
      !this.vehicle.licensePlate)
  ) {
    const err = new Error(`Vehicle information is incomplete.`);
    err.status = 400;
    return next(err);
  }
  next();
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
