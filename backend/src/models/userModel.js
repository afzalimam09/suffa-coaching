import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

//Creating User Schema
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    fatersName: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    mobile: {
        type: Number,
        required: [true, "Please provide your mobile number!"],
    },
    regNo: {
        type: Number,
        required: [true, "Please provide your registration number!"],
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "left"],
    },
    profileImg: String,
    TotalDues: Number,
});

// To select only active users
userSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

//Create Model out of Schema

const User = db.model("User", userSchema);

export default User;
