import { Router } from "express";
import { protect, restrictToAdmin } from "../auth/authController.js";
import { sendContactEmail, sendNoticeEmail } from "./emailController.js";

const router = Router();

router.post("/send-contact-email", sendContactEmail);
router.use(protect, restrictToAdmin);
router.post("/send-notice-email", sendNoticeEmail);

export default router;
