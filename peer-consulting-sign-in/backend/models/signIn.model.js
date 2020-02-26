const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signInSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
      trim: true,
      minlength: 9
    },
    date: { type: String },
    time: { type: String },
    purposeOfVisit: { type: String }
  },
  {
    timestamps: true
  }
);

const signIn = mongoose.model("signIn", signInSchema);

module.exports = signIn;
