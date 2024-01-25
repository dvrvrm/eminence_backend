const { sign, verify } = require('jsonwebtoken');
const { compare, hash } = require('bcryptjs');
const {JWT_SECRET} = require("../config/credentials");

function createJSONToken(user) {
  return sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
}

function validateJSONToken(token, callback) {
  return verify(token, JWT_SECRET, callback);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

function hashPassword(password) {
  return hash(password, 10)
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.hashPassword = hashPassword;