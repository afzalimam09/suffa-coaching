import AppError from "../../helper/appError.js";
import catchAsync from "../../helper/catchAsync.js";
import Result from "../../models/resultModel.js";
import Student from "../../models/studentModel.js";
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "../handleFactory.js";

export const getAllResultInFullDetail = catchAsync(async (req, res, next) => {
    const doc = await Result.find(req.query)
        .populate({
            path: "studentId",
            populate: {
                path: "class",
                model: "Class",
            },
        })
        .exec();

    res.status(200).json({
        status: "success",
        data: doc,
    });
});

export const checkStudentBeforeResult = catchAsync(async (req, res, next) => {
    const { examId, regNo } = req.query;
    if (!examId || !regNo)
        return next(new AppError("Please enter examId and regNo", 401));
    const student = await Student.findOne({ regNo });
    if (!student)
        return next(new AppError("No student found with this reg no", 404));

    req.query.studentId = student._id;
    req.query.populate = "studentId";
    next();
});

export const getAllResult = getAll(Result);
export const getSingleResult = getOne(Result);
export const updateResult = updateOne(Result);
export const deleteResult = deleteOne(Result);
export const createResult = createOne(Result);
