import catchAsync from "../../helper/catchAsync.js";
import Payment from "../../models/paymentModel.js";
import Student from "../../models/studentModel.js";
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "../handleFactory.js";

export const updateStudentBeforePayment = catchAsync(async (req, res, next) => {
    const { dueAfterPayment, advanceAfterPayment, studentId } = req.body;
    const dataToUpdate = {
        totalDues: dueAfterPayment,
        advanceAmount: advanceAfterPayment,
    };
    await Student.findByIdAndUpdate(studentId, dataToUpdate, {
        runValidators: true,
    });
    next();
});

export const getAllPayment = getAll(Payment);
export const getSinglePayment = getOne(Payment);
export const updatePayment = updateOne(Payment);
export const deletePayment = deleteOne(Payment);
export const createPayment = createOne(Payment);
