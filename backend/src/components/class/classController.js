import catchAsync from "../../helper/catchAsync.js";
import Class from "../../models/classModel.js";
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "../handleFactory.js";

export const getClassWithStudentCount = catchAsync(async (req, res, next) => {
    const doc = await Class.aggregate([
        {
            $lookup: {
                from: "students",
                localField: "_id",
                foreignField: "class",
                as: "students",
            },
        },
        {
            $project: {
                classNumber: 1,
                subjects: 1,
                fullMarks: 1,
                totalStudents: { $size: "$students" },
            },
        },
    ]);

    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: doc.length,
        data: doc,
    });
});

export const getAllClass = getAll(Class);
export const getSingleClass = getOne(Class);
export const updateClass = updateOne(Class);
export const deleteClass = deleteOne(Class);
export const createClass = createOne(Class);
