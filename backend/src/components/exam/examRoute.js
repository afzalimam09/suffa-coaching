import { Router } from "express";
import { protect, restrictToAdmin } from "../auth/authController.js";
import {
    createExam,
    deleteExam,
    getAllExam,
    getExamStatics,
    getSingleExam,
    updateExam,
} from "./examController.js";

const router = Router();

// router.use(protect, restrictToAdmin);

router.route("/").get(getAllExam).post(createExam);
router.route("/statics/:examId").get(getExamStatics);
router.route("/:id").get(getSingleExam).patch(updateExam).delete(deleteExam);

export default router;
