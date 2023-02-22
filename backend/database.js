const mongoose = require("mongoose");
const url =
  "mongodb+srv://admin:admin@ems.f9vos16.mongodb.net/?retryWrites=true&w=majority";
module.exports.connect = () => {
  mongoose
    .connect(url)
    .then((res) => console.log("Mongo DB connected Successfully"))
    .catch((err) => console.log("Error", err));
};
