import { Router } from "express";
import { protect, restrictToAdmin } from "../auth/authController.js";
import {
    checkStudentBeforeResult,
    createResult,
    deleteResult,
    getAllResult,
    getAllResultInFullDetail,
    getSingleResult,
    updateResult,
} from "./resultController.js";

const router = Router();

router.route("/").get(getAllResult).post(createResult);
router.route("/in-detail").get(getAllResultInFullDetail);
router.route("/single").get(checkStudentBeforeResult, getAllResult);
router
    .route("/:id")
    .get(getSingleResult)
    .patch(updateResult)
    .delete(deleteResult);

export default router;
