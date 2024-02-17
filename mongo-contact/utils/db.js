const mongoose = require("mongoose");

// Connect Database
mongoose.connect("mongodb://127.0.0.1:27017/contact-app");

// // Add 1 Data
// const contact1 = new Contact({
//   name: "Dhea Ramdani",
//   phone: "081123456789",
//   email: "dhea@gmail.com",
// });

// contact1.save().then((contact) => console.log(contact));
