import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

//Creating User Schema
const noticeSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, "Please enter notice content!"],
        },
    },
    { timestamps: true }
);

//Create Model out of Schema

const Notice = db.model("Notice", noticeSchema);

export default Notice;
