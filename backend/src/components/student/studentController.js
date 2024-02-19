import catchAsync from "../../helper/catchAsync.js";
import Student from "../../models/studentModel.js";
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "../handleFactory.js";

export const attachRegNo = catchAsync(async (req, res, next) => {
    const totalStudents = await Student.countDocuments({});
    const currentYear = new Date().getFullYear();
    const regPattern = currentYear.toString() + "0000";
    const finalRegNo = +regPattern + (totalStudents + 1);
    req.body.regNo = finalRegNo;
    next();
});

export const addStudent = createOne(Student);
export const getAllStudent = getAll(Student);
export const getSingleStudent = getOne(Student);
export const updateStudent = updateOne(Student);
export const deleteStudent = deleteOne(Student);
