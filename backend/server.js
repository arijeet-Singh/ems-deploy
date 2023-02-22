const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const database = require("./database");
const router = require("./routers");

const app = express();

const PORT = process.env.PORT || 5000;

database.connect();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Server");
});
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
