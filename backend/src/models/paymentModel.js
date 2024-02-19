import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

//Creating User Schema
const paymentSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
    dueBeforePayment: {
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    dueAfterPayment: {
        type: Number,
        required: true,
    },
    advanceAfterPayment: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
});

//Create Model out of Schema

const Payment = db.model("Payment", paymentSchema);

export default Payment;
