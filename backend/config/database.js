const mongoose = require("mongoose");

exports.connectDatabase = () => {
  // Set strictQuery to false to prepare for the upcoming change
  mongoose.set('strictQuery', false);

  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};
