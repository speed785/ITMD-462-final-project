//Here we connect to the mongo database

const mongoose = require("mongoose");
//doesn't work on windows to secure connection
//console.log(process.env.MONGO_ATLAS_PW);
mongoose.connect(
  "mongodb+srv://big-bird:" +
    "bigfeet" +
    "@cluster0.mgmza.mongodb.net/Cluster0;",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log("MongoDB connection successful");
    } else {
      console.log("connection failed", err);
    }
  }
);

require("./user.model");
