import mongoose from "mongoose";

import catchAsync from "../../helper/catchAsync.js";
import Exam from "../../models/examModel.js";
import Result from "../../models/resultModel.js";
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "../handleFactory.js";

export const getExamStatics = catchAsync(async (req, res, next) => {
    const { examId } = req.params;
    const pipeline = [
        {
            $match: { examId: mongoose.Types.ObjectId(examId) },
        },
        {
            $group: {
                _id: null,
                totalAppeared: { $sum: 1 },
                totalPassed: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$grade", "Fail"] },
                            then: 0,
                            else: 1,
                        },
                    },
                },
                totalFailed: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$grade", "Fail"] },
                            then: 1,
                            else: 0,
                        },
                    },
                },
                firstGrade: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$grade", "First"] },
                            then: 1,
                            else: 0,
                        },
                    },
                },
                secondGrade: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$grade", "Second"] },
                            then: 1,
                            else: 0,
                        },
                    },
                },
                thirdGrade: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$grade", "Third"] },
                            then: 1,
                            else: 0,
                        },
                    },
                },
            },
        },
    ];

    const result = await Result.aggregate(pipeline);
    let doc;

    if (result.length > 0) {
        doc = {
            totalAppeared: result[0].totalAppeared,
            totalPassed: result[0].totalPassed,
            totalFailed: result[0].totalFailed,
            firstGrade: result[0].firstGrade,
            secondGrade: result[0].secondGrade,
            thirdGrade: result[0].thirdGrade,
        };
    } else {
        doc = {
            totalAppeared: 0,
            totalPassed: 0,
            totalFailed: 0,
            firstGrade: 0,
            secondGrade: 0,
            thirdGrade: 0,
        };
    }

    res.status(200).json({
        status: "success",
        data: doc,
    });
});

export const getAllExam = getAll(Exam);
export const getSingleExam = getOne(Exam);
export const updateExam = updateOne(Exam);
export const deleteExam = deleteOne(Exam);
export const createExam = createOne(Exam);
