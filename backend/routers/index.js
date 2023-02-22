const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const employeeRouter = require("./employee")
router.get("/", (req, res) => {
  res.send("Welcome");
});

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);
module.exports = router;
