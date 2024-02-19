import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

//Creating User Schema
const resultSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
    examId: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    subjectMarks: [],
    totalMarks: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
        enum: ["First", "Second", "Third", "Fail"],
    },
    percentage: {
        type: String,
        required: true,
    },
});

//Create Model out of Schema
const Result = db.model("Result", resultSchema);

export default Result;
