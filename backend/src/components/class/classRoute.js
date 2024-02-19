import { Router } from "express";
import { protect, restrictToAdmin } from "../auth/authController.js";
import {
    createClass,
    deleteClass,
    getAllClass,
    getClassWithStudentCount,
    getSingleClass,
    updateClass,
} from "./classController.js";

const router = Router();

// router.use(protect, restrictToAdmin);

router.route("/").get(getAllClass).post(createClass);
router.route("/class-with-student-count").get(getClassWithStudentCount);
router.route("/:id").get(getSingleClass).patch(updateClass).delete(deleteClass);

export default router;
