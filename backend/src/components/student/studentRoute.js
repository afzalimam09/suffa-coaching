import { Router } from "express";
import { protect, restrictToAdmin } from "../auth/authController.js";
import {
    addStudent,
    attachRegNo,
    deleteStudent,
    getAllStudent,
    getSingleStudent,
    updateStudent,
} from "./studentController.js";

const router = Router();

// router.use(protect);
// router.use(restrictToAdmin);
router.route("/").get(getAllStudent).post(attachRegNo, addStudent);
router
    .route("/:id")
    .get(getSingleStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

export default router;
