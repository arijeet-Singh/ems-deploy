const router = require("express").Router();
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newEmployee = new Employee({
      email: req.body.email,
      password: hashedPassword,
    });
    const employee = newEmployee.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
      }
    });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email.includes("@gmail.com")) {
      res.status(406).json("Wrong Email ID");
    } else {
      const employee = await Employee.findOne({ email: req.body.email });
      if (!employee) {
        res.status(406).json("Employee Not Found");
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          employee.password
        );
        if (validPassword) {
          res.status(200).json(employee);
        } else {
          res.status(404).json("Wrong Password");
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
