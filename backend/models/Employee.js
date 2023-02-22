const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  employeeID: {
    type: String,
    unique: true,
    default: mongoose.Types.ObjectId,
  },
  aadhaar: {
    type: String,
    unique: true,
    default: mongoose.Types.ObjectId,
  },
  permanentAddress: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
    default: mongoose.Types.ObjectId,
  },
  department: {
    type: String,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
