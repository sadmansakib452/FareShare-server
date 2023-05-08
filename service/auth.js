const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");
const error = require("../utils/error");

const registerService = async (data) => {
  let user = await findUserByProperty("email", data.email);

  if (user) throw error("User already exist", 400);

  //hashing the password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(data.password, salt);
  data.password = hash
  return createNewUser(data);
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) throw error("Invalid Credential", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error("Invalid Credential", 400);

  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  };
  const token = jwt.sign(payload, "secret-key");
  return token;
};

module.exports = {
  registerService,
  loginService,
};
