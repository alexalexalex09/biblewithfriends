//Set up mongoose connection
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create schema
var UserSchema = new Schema(
  {
    id: String,
    name: String,
    email: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", UserSchema);
/*

//Export function to create "SomeModel" model class
module.exports = mongoose.model('SomeModel', SomeModelSchema );

You can then require and use the model immediately in other files. Below we show how you might use it to get all instances of the model.

//Create a SomeModel model just by requiring the module
var SomeModel = require('../models/somemodel')

// Use the SomeModel object (model) to find all SomeModel records
SomeModel.find(callback_function);
*/
