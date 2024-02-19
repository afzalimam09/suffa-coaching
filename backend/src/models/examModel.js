import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

//Creating User Schema
const examSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        examType: {
            type: String,
            required: true,
            enum: ["Half Yearly", "Annual"],
        },
    },
    { timestamps: true }
);

//Create Model out of Schema

const Exam = db.model("Exam", examSchema);

export default Exam;
