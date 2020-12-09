//connection to mongo
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//User schema
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: "This field is required.",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: "This field is required.",
    required: true,
  },
});

// custom validation for email
userSchema.path("email").validate((val) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(val);
}, "Invalid Email");

mongoose.model('User', userSchema);