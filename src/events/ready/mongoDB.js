const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;

module.exports = async () => {
  if (!mongoURL) return;

  await mongoose.connect(mongoURL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (mongoose.connect) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Failed to connect to MongoDB");
  }
};
