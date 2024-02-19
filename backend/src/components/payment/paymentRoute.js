import { Router } from "express";
import { protect, restrictToAdmin } from "../auth/authController.js";
import {
    createPayment,
    deletePayment,
    getAllPayment,
    getSinglePayment,
    updatePayment,
    updateStudentBeforePayment,
} from "./paymentController.js";

const router = Router();

// router.use(protect, restrictToAdmin);

router
    .route("/")
    .get(getAllPayment)
    .post(updateStudentBeforePayment, createPayment);
router
    .route("/:id")
    .get(getSinglePayment)
    .patch(updatePayment)
    .delete(deletePayment);

export default router;
