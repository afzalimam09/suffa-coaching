import { Router } from "express";

import noticeRoute from "./notice/noticeRoute.js";
import authRoute from "./auth/authRoute.js";
import studentRoute from "./student/studentRoute.js";
import classRoute from "./class/classRoute.js";
import examRoute from "./exam/examRoute.js";
import resultRoute from "./result/resultRoute.js";
import paymentRoute from "./payment/paymentRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/student", studentRoute);
router.use("/notice", noticeRoute);
router.use("/class", classRoute);
router.use("/exam", examRoute);
router.use("/result", resultRoute);
router.use("/payment", paymentRoute);

export default router;
