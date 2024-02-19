import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

//Creating User Schema
const studentSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    fathersName: {
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
    totalDues: Number,
    advanceAmount: Number,
});

// To select only active users
studentSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

//Create Model out of Schema

const Student = db.model("Student", studentSchema);

export default Student;
