import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

//Creating User Schema
const classSchema = new Schema({
    classNumber: {
        type: Number,
        required: true,
    },
    subjects: [],
    fullMarks: Number,
});

//Create Model out of Schema
const Class = db.model("Class", classSchema);

export default Class;
